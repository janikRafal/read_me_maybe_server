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

exports.updateCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const category = await Category.update(
      { CategoryName },
      { where: { CategoryID: req.params.id } }
    );
    res.status(200).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można zaktualizować kategorii" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({ where: { CategoryID: req.params.id } });
    res.status(200).send({ message: "Kategoria została usunięta" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można usunąć kategorii" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ error: "Kategoria nie została znaleziona" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać informacji o kategorii" });
  }
};
