const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać kategorii" });
  }
};
