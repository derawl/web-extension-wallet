const express = require("express");
const Moralis = require("moralis").default;

const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

//use alchemy instead of moralis

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {
  try {
    const { userAddress, chain } = req.query;
    const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chain,
      address: userAddress
    })

    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: chain,
      address: userAddress,
      mediaItems: true
    })

    const myNfts = nfts.raw.result.map((e, i) => {
      if (e?.media?.media_collection?.high?.url && !e.possible_span && e?.media?.catergory != "video") {
        return e["media"]["media_collection"]["high"]["url"]
      }
    })

    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      chain: chain,
      address: userAddress,
    })

    const jsonResponse = {
      tokens: tokens.raw,
      nfts: myNfts,
      balance: nativeBalance.raw.balance / (10 ** 18)
    }
    return res.status(200).json({ jsonResponse });
  } catch (err) {
    return res.status(500).json({ "status": "failed" });
  }
});




Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
