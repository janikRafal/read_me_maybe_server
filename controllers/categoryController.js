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

exports.createCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const category = await Category.create({ CategoryName });
    res.status(201).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można utworzyć kategorii" });
  }
};
