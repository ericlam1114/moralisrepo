//Set Up Express Server Here

const express = require("express");
const cors = require("cors");
const moonbirdsOwners = require("./moonbirdsOwners");
const moonbirdsHistory = require("./moonbirdsHistory");

//Contract address from /stats/stats.js
const collections = {
  "0x23581767a106ae21c074b2276d25e5c3e136a68b": {
    owners: moonbirdsOwners,
    history: moonbirdsHistory,
  },
};

const app = express();

const port = 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Whale NFT server");
});

//Get owners object for collection
app.get("/collection", (req, res) => {
  const slug = req.query.slug;
  res.send(collections[slug].owners);
});

//Pass address and get transactions
app.get("/user", (req, res) => {
  const slug = req.query.slug;
  const address = req.query.address;
  res.send(collections[slug].history[address]);
});

app.listen(port, () => console.log(`Whale NFT server running on ${port}`));
