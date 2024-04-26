const xrpl = require("xrpl");
const { XummSdk } = require("xumm-sdk");

const Sdk = new XummSdk("someAppKey", "someAppSecret");

async function getTestWallet() {
  var test_wallet;
  const request = {
    TransactionType: "SignIn",
  };

  const subscription = await Sdk.payload?.createAndSubscribe(
    request,
    (event) => {
      console.log("New payload event", event.data);

      if (Object.keys(event.data).indexOf("signed") > -1) {
        return event.data;
      }
    }
  );

  console.log("Subscription: ", subscription.created.next.always);
  console.log("Pushed ", subscription.created.pushed ? "Yes" : "No");

  const resolvedData = await subscription.resolved;
  if (resolvedData.signed == false) {
    console.log("The signed request was rejected!");
  } else {
    console.log("The signed request was signed!");
    const result = await Sdk.payload.get(resolvedData.payload_uuidv4);
    test_wallet = result.response.account;
    // console.log({
    //   "User Token": result?.application.issued_user_token,
    //   environment_nodetype: result?.response.environment_nodetype,
    //   Account: result?.response.account,
    // });
  }
  // console.log(test_wallet);
  return test_wallet;
}

async function main() {
  const PUBLIC_SERVER = "wss://xrplcluster.com/";
  const client = new xrpl.Client(PUBLIC_SERVER);
  await client.connect();
  // ... custom code goes here
  // Create a wallet and fund it with the Testnet faucet:
  const test_wallet = xrpl.Wallet.fromSeed("sn3nxiW7v8KXzPzAqzyHXbSSKNuN9"); // Test secret; don't use for real
  console.log(test_wallet);
  // Disconnect when done (If you omit this, Node.js won't end the process)
  await client.disconnect();
}

async function mintToken() {
  const PUBLIC_SERVER = "wss://xrplcluster.com/";
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  // ... custom code goes here
  // Create a wallet and fund it with the Testnet faucet:
  // const test_wallet = xrpl.Wallet.fromSeed("sEdVNHd8LASqyprbJhcaHYotRgwcnTK"); // Test secret; don't use for real
  // // const test_wallet = {
  // //   classicAddress: "rEj8hHK1zt7QR26auq12aJJ5YmHNZP7Uu1",
  // // };
  // console.log(test_wallet);

  // Integrating Xaman

  var test_wallet = {};
  const request = {
    TransactionType: "SignIn",
  };

  const subscription = await Sdk.payload?.createAndSubscribe(
    request,
    (event) => {
      console.log("New payload event", event.data);

      if (Object.keys(event.data).indexOf("signed") > -1) {
        return event.data;
      }
    }
  );

  console.log("Subscription: ", subscription.created.next.always);
  console.log("Pushed ", subscription.created.pushed ? "Yes" : "No");

  const resolvedData = await subscription.resolved;
  if (resolvedData.signed == false) {
    console.log("The signed request was rejected!");
  } else {
    console.log("The signed request was signed!");
    const result = await Sdk.payload.get(resolvedData.payload_uuidv4);
    test_wallet.classicAddress = result.response.account;
    // console.log({
    //   "User Token": result?.application.issued_user_token,
    //   environment_nodetype: result?.response.environment_nodetype,
    //   Account: result?.response.account,
    // });
  }

  const transactionJson = {
    TransactionType: "NFTokenMint",
    Account: test_wallet.classicAddress,
    URI: xrpl.convertStringToHex(
      "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi"
    ),
    Flags: parseInt("8"),
    TransferFee: parseInt("0"),
    NFTokenTaxon: 0, //Required, but if you have no use for it, set to zero.
  };
  console.log(transactionJson);

  // ----------------------------------------------------- Submit signed blob
  const tx = await client.submitAndWait(transactionJson, {
    wallet: test_wallet,
  });
  const nfts = await client.request({
    method: "account_nfts",
    account: test_wallet.classicAddress,
  });

  // ------------------------------------------------------- Report results
  var standbyBalanceField = {};
  var standbyResultField = {};
  var results;
  results += "\n\nTransaction result: " + tx.result.meta.TransactionResult;
  results += "\n\nnfts: " + JSON.stringify(nfts, null, 2);
  standbyBalanceField.value = await client.getXrpBalance(test_wallet.address);
  standbyResultField.value = results;

  console.log(standbyBalanceField);
  console.log(standbyResultField);
  client.disconnect();
}

// *******************************************************
// ******************* Get Tokens ************************
// *******************************************************

async function getTokens() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  // ... custom code goes here
  // const test_wallet = xrpl.Wallet.fromSeed("sEdVNHd8LASqyprbJhcaHYotRgwcnTK"); // Test secret; don't use for real
  // // const test_wallet = {
  // //   classicAddress: "rEj8hHK1zt7QR26auq12aJJ5YmHNZP7Uu1",
  // // };
  // console.log(test_wallet);

  // Integrating Xaman

  var test_wallet = {};
  const request = {
    TransactionType: "SignIn",
  };

  const subscription = await Sdk.payload?.createAndSubscribe(
    request,
    (event) => {
      console.log("New payload event", event.data);

      if (Object.keys(event.data).indexOf("signed") > -1) {
        return event.data;
      }
    }
  );

  console.log("Subscription: ", subscription.created.next.always);
  console.log("Pushed ", subscription.created.pushed ? "Yes" : "No");

  const resolvedData = await subscription.resolved;
  if (resolvedData.signed == false) {
    console.log("The signed request was rejected!");
  } else {
    console.log("The signed request was signed!");
    const result = await Sdk.payload.get(resolvedData.payload_uuidv4);
    test_wallet.classicAddress = result.response.account;
    // console.log({
    //   "User Token": result?.application.issued_user_token,
    //   environment_nodetype: result?.response.environment_nodetype,
    //   Account: result?.response.account,
    // });
  }
  // ------------------------------------------------------- Report results
  var standbyBalanceField = {};
  var standbyResultField = {};
  var results;

  results += "\nConnected. Getting NFTs...";
  standbyResultField.value = results;
  const nfts = await client.request({
    method: "account_nfts",
    account: test_wallet.classicAddress,
  });

  results += "\nNFTs:\n " + JSON.stringify(nfts, null, 2);
  standbyResultField.value = results;
  console.log(standbyBalanceField);
  console.log(standbyResultField);
  client.disconnect();
} //End of getTokens()


// INVOCATION OF FUNCTIONS
mintToken();
// getTokens();
