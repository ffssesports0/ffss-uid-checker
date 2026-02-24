const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/ff", async (req, res) => {
  const uid = req.body.uid;

  try {
    const response = await fetch(
      "https://apifreefireglobal.com/uidlookup", // Global UID API (example)
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: uid })
      }
    );
    const data = await response.json();

    if (!data || !data.name) return res.json({ error: "UID not found" });

    res.json({
      name: data.name,
      level: data.level,
      rank: data.rank,
      region: data.region,
      profileUrl: data.profileUrl
    });
  } catch (err) {
    res.json({ error: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Global FF Proxy running on PORT:", PORT));
