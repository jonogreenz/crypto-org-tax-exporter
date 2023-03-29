import fetch from "isomorphic-fetch";

const baseCro = 0.00000001; // 10^-8

function convertBaseCroToCro(
  value:
    | {
        denom: string;
        amount: string;
      }
    | string
) {
  if (typeof value === "string") {
    const baseAmount = parseInt(value, 10);
    return (baseAmount * baseCro).toFixed(8);
  }

  const { denom, amount } = value;
  const baseAmount = parseInt(amount, 10);
  if (denom === "basecro") {
    return (baseAmount * baseCro).toFixed(8);
  }
  throw new Error("Unsupported currency type");
}

async function getTransactionPage(address: string, page: number) {
  console.log(fetch);
  const res = await fetch(
    `https://crypto.org/explorer/api/v1/accounts/${address}/transactions?page=${page}&limit=1000`
  );

  const data = await res.json();
  if (!data) {
    throw Error("Failed to fetch");
  }

  return [data.result, data.pagination];
}

async function getTransactions(address: string) {
  const page = await getTransactionPage(address, 1);
  const [result, pagination] = page;

  let pageNum = 2;
  let fullResult = result;
  for (let i = pageNum; i < pagination.total_page; i++) {
    const nextPage = await getTransactionPage(address, i);
    fullResult = [...result, ...nextPage[0]];
  }
  return fullResult;
}

// NOTES and thanks to:
// - https://pastebin.com/raw/Z2YNJiV7
// - https://github.com/jdambron/croexplorer
async function parseTransactions(address: string, txs: any[]) {
  const parsedResults = txs
    .filter((tx) => tx.success)
    .flatMap((tx) => {
      const messages = tx.messages.map((msg: any) => {
        let data = {
          date: tx.blockTime,
          memo: tx.memo ? tx.memo + " " + tx.hash : tx.hash,
          feeCurrency: "CRO",
          feeAmount: convertBaseCroToCro(tx.fee[0]),
        } as any;

        switch (msg.type) {
          case "/cosmos.bank.v1beta1.MsgSend":
            if (msg.content.fromAddress === address) {
              data.type = "send";
              data.sendCurrency = "CRO";
              data.sendAmount = convertBaseCroToCro(msg.content.amount[0]);
            } else {
              data.type = "receive";
              data.receiveCurrency = "CRO";
              data.receiveAmount = convertBaseCroToCro(msg.content.amount[0]);
            }
            break;

          case "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":
            data.type = "reward";
            data.receiveCurrency = "CRO";
            data.receiveAmount = convertBaseCroToCro(msg.content.amount[0]);
            break;
          case "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission":
            data.type = "mining";
            data.receiveCurrency = "CRO";
            data.receiveAmount = convertBaseCroToCro(msg.content.amount[0]);
            break;

          case "/cosmos.staking.v1beta1.MsgDelegate":
          case "/cosmos.staking.v1beta1.MsgBeginRedelegate":
          case "/cosmos.staking.v1beta1.MsgUndelegate":
            data.type = "reward";
            data.receiveCurrency = "CRO";
            data.receiveAmount = convertBaseCroToCro(
              msg.content.autoClaimedRewards.amount
            );
            break;

          case "/cosmos.ibc.v1beta1.MsgTransfer":
            if (msg.content.params.receiver === address) {
              data.type = "send";
              data.sendCurrency = "CRO";
              data.sendAmount = convertBaseCroToCro(
                msg.content.params.packetData.amount
              );
            } else {
              data.type = "receive";
              data.receiveCurrency = "CRO";
              data.receiveAmount = convertBaseCroToCro(msg.content.amount[0]);
            }
            break;
        }

        return data;
      });

      return messages;
    });

  return parsedResults;
}

export async function extractHistory(address: string) {
  const rawTxs = await getTransactions(address);
  const transactions = await parseTransactions(address, rawTxs);
  return transactions;
}

function formatDateCryptoCom(date: string) {
  let d = new Date(date);
  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2) +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2)
  );
}

export function formatCsvCryptoCom(history: any[]) {
  let csvHeader =
    "Date,Type,Received Currency,Received Amount,Received Net Worth,Sent Currency,Sent Amount,Sent Net Worth,Fee Currency,Fee Amount,Fee Net Worth,Description";

  const csvBody = history.map((tx) => {
    return [
      formatDateCryptoCom(tx.date),
      tx.type,
      tx.receiveCurrency || "",
      tx.receiveAmount || "",
      "",
      tx.sendCurrency || "",
      tx.sendAmount || "",
      "",
      tx.feeCurrency || "",
      tx.feeAmount || "",
      "",
      tx.memo,
    ].join(",");
  });

  return csvHeader + "\n" + csvBody.join("\n");
}
