const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const path = require("path");

const Photo = require("./models/Photo.js");

const port = 5000;

const app = express();

//CONNECT TO DATABASE
mongoose.connect(
  "mongodb://localhost/pcat-test-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, _) => {
    if (!err) console.log("Database baglantisi saglandi");
  }
);

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  console.log("Photolar aliniyor");
  res.render("index", { photos });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  console.log(req.body);
  await Photo.create(req.body);
  res.redirect("/");
});

app.get("/photos/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render("photo", {
    photo,
  });
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
