const Photo = require("../models/Photo");

exports.aboutPageController = (req, res) => {
  res.render("about");
};

exports.addPageController = (req, res) => {
  res.render("add");
};

exports.editPageController = async (req, res) => {
  const id = req.params.id;
  const photo = await Photo.findById(id);

  res.render("edit", {
    photo,
  });
};
