const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const path = require("path");
const fs = require("fs");
const Photo = require("./models/Photo.js");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");

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
app.use(fileUpload());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//ROUTES
app.get("/", photoController.getAllPhotosController);
app.post("/photos", photoController.createPhotoController);
app.get("/photos/:id", photoController.getPhotoController);
app.put("/photos/edit/:id", photoController.editPhotoController);
app.delete("/photos/delete/:id", photoController.deletePhotoController);

app.get("/about", pageController.aboutPageController);
app.get("/add", pageController.addPageController);
app.get("/photos/edit/:id", pageController.editPageController);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
