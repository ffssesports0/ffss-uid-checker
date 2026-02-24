const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());
app.use(express.json());

// MAIN PROXY ROUTE
app.post("/ff", async (req, res) => {
  const uid = req.body.uid;

  const response = await fetch(
    "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productId: "3",
        itemId: "1",
        catalogId: "57",
        paymentId: "352",
        gameId: uid,
        product_ref: "REG",
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});

// Vercel / Render / Cyclic assigns PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("FFSS UID Proxy Running on PORT:", PORT));