const xrpl = require("xrpl");
const { XummSdk } = require("xumm-sdk");

const Sdk = new XummSdk("someAppKey", "someAppSecret");
// *******************************************************
// ****************** Create Sell Offer ******************
// *******************************************************

async function createSellOffer() {
  // Defining result fields to report
  var results;
  var operationalBalanceField = {};
  var standbyBalanceField = {};
  var standbyResultField = {};

  //   const {
  //     standby_seed,
  //     standby_token_id,
  //     opertaional_seed,
  //     standby_expiration,
  //     standby_amt,
  //     standby_destination,
  //   } = [
  //     "sEdVNHd8LASqyprbJhcaHYotRgwcnTK",
  //     "0008000084073220D035759EA9DB4EA562512F493A4E0B5F2AA889A30001F808",
  //     "",
  //     "3",
  //     "0",
  //     "",
  //       ];
  const standby_seed = "sEdVNHd8LASqyprbJhcaHYotRgwcnTK";
  const standby_token_id =
    "0008000084073220D035759EA9DB4EA562512F493A4E0B5F418E5AA40001F809";
  const opertaional_seed = "sEdSFtp7jEpdzdXPDQ3HjDmjFqLknEY";
  const standby_expiration = 2;
  const standby_amt = "";
  const standby_destination = "rBnDCdKYtaLNjVPiK2fgtfNgiiVEJmZQ3n";

  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
//   const standby_wallet = xrpl.Wallet.fromSeed(standby_seed);
  //   const operational_wallet = xrpl.Wallet.fromSeed(opertaional_seed);

  // Integrating Xaman

    var standby_wallet = {};
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
      standby_wallet.classicAddress = result.response.account;
      // console.log({
      //   "User Token": result?.application.issued_user_token,
      //   environment_nodetype: result?.response.environment_nodetype,
      //   Account: result?.response.account,
      // });
    }

  // XAMAN INTEGRATION ENDS

  //------------------------------------- Prepare Expiration Date
  var expirationDate = null;
  if (standby_expiration != "") {
    var days = standby_expiration;
    let d = new Date();
    d.setDate(d.getDate() + parseInt(days));
    expirationDate = xrpl.isoTimeToRippleTime(d);
  }

  // Prepare transaction -------------------------------------------------------
  let transactionBlob = {
    TransactionType: "NFTokenCreateOffer",
    Account: standby_wallet.classicAddress,
    NFTokenID: standby_token_id,
    Amount: standby_amt,
    Flags: parseInt("1"),
  };

  if (expirationDate != null) {
    transactionBlob.Expiration = expirationDate;
  }
  //   if (standby_destination !== "") {
  //     transactionBlob.Destination = standby_destination;
  //   }

  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob, {
    wallet: standby_wallet,
  });

  results += "\n\n***Sell Offers***\n";

  let nftSellOffers;

  try {
    nftSellOffers = await client.request({
      method: "nft_sell_offers",
      nft_id: standby_token_id,
    });
  } catch (err) {
    nftSellOffers = "No sell offers.";
  }

  results += JSON.stringify(nftSellOffers, null, 2);
  results += "\n\n***Buy Offers***\n";
  let nftBuyOffers;
  try {
    nftBuyOffers = await client.request({
      method: "nft_buy_offers",
      nft_id: standby_token_id,
    });
    results += JSON.stringify(nftBuyOffers, null, 2);
  } catch (err) {
    results += "No buy offers.";
  }

  // Check transaction results -------------------------------------------------
  results +=
    "\n\nTransaction result:\n" +
    JSON.stringify(tx.result.meta.TransactionResult, null, 2);
  //   results +=
  //     "\n\nBalance changes:\n" +
  //     JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
  //   operationalBalanceField.value = await client.getXrpBalance(
  //     operational_wallet.address
  //   );
  standbyBalanceField.value = await client.getXrpBalance(
    standby_wallet.address
  );
  standbyResultField.value = results;
  console.log(operationalBalanceField);
  console.log({ standbyBalanceField: standbyBalanceField });
  console.log(results);
  client.disconnect();
}

// *******************************************************
// ****************** Accept Sell Offer ******************
// *******************************************************

async function acceptSellOffer() {
  var results;
  var operationalBalanceField = {};
  // Input nft token offer index to accept here
  var standbyTokenOfferIndexField = {
    value: "305FEB49D010FD6176DBF26A9DA9A4096038D2580D5DBA10ABCD533CB4570703",
  };

  const opertaional_seed = "sEdSidVSchL9FsfFMQrSW34rVyRC5MD";

  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

//   const operational_wallet = xrpl.Wallet.fromSeed(opertaional_seed);

  // Integrating Xaman

  var operational_wallet = {};
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

  console.log({Subscription: subscription.created.next.always});
  console.log("Pushed ", subscription.created.pushed ? "Yes" : "No");

  const resolvedData = await subscription.resolved;
  if (resolvedData.signed == false) {
    console.log("The signed request was rejected!");
  } else {
    console.log("The signed request was signed!");
    const result = await Sdk.payload.get(resolvedData.payload_uuidv4);
    operational_wallet.classicAddress = result.response.account;
    // console.log({
    //   "User Token": result?.application.issued_user_token,
    //   environment_nodetype: result?.response.environment_nodetype,
    //   Account: result?.response.account,
    // });
  }

  // XAMAN INTEGRATION ENDS
  // Prepare transaction -------------------------------------------------------
  const transactionBlob = {
    TransactionType: "NFTokenAcceptOffer",
    Account: operational_wallet.classicAddress,
    NFTokenSellOffer: standbyTokenOfferIndexField.value,
  };
  // Submit transaction --------------------------------------------------------
  const tx = await client.submitAndWait(transactionBlob, {
    wallet: operational_wallet,
  });
  const nfts = await client.request({
    method: "account_nfts",
    account: operational_wallet.classicAddress,
  });

  // Check transaction results -------------------------------------------------

  operationalBalanceField.value = await client.getXrpBalance(
    operational_wallet.address
  );

  results += "Transaction result:\n";
  results += JSON.stringify(tx.result.meta.TransactionResult, null, 2);
  results += "\nBalance changes:";
  results += JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
  results += JSON.stringify(nfts, null, 2);
  console.log({ results: results });
  console.log(operationalBalanceField);
  client.disconnect();
}

createSellOffer();
// acceptSellOffer();
