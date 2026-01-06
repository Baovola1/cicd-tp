const express = require("express");
const { getGreeting } = require("./greeting");

const app = express();
const PORT = process.env.PORT || 3000;

// GET /hello with query parameter ?name=John
app.get("/hello", (req, res) => {
  const name = req.query.name; // ✅ Lit le query parameter
  res.send(getGreeting(name));
});

// Reject POST method with 405
app.post("/hello", (req, res) => {
  res.status(405).send("Method Not Allowed");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;