const Photo = require("../models/Photo");
const fs = require("fs");
exports.getAllPhotosController = async (req, res) => {
  const photos = await Photo.find({});
  res.render("index", { photos });
};
exports.createPhotoController = async (req, res) => {
  //console.log(req.files?.image);
  //await Photo.create(req.body);
  //res.redirect("/");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const image = req.files?.image;
  const uploadPath = `${__dirname}/../public/uploads/${image.name}`;

  image.mv(uploadPath, async (err) => {
    if (err) return res.status(500).send(err);
    await Photo.create({ ...req.body, image: `/uploads/${image.name}` });
  });
  res.redirect("/");
};
exports.getPhotoController = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render("photo", {
    photo,
  });
};
exports.editPhotoController = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const photo = await Photo.findById(id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};
exports.deletePhotoController = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  console.log(`${__dirname}public${photo?.image}`);

  fs.unlink(`${__dirname}/../public${photo?.image}`, async (err) => {
    console.log("unlink calisti");
    if (!err) {
      console.log("error yok siliniyor");
      await Photo.findByIdAndRemove(req.params.id);
    }
  });
  res.redirect("/");
};
