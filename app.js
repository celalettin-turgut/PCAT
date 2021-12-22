const express = require("express");
const path = require("path");
const app = express();

const port = 5000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

app.get("/about.html", (req, res) => {
  console.log("about");
  res.sendFile(path.resolve(__dirname, "temp/about.html"));
});

app.get("/contact.html", (req, res) => {
  console.log("about");
  res.sendFile(path.resolve(__dirname, "temp/contact.html"));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
