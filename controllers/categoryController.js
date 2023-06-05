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
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ error: "Kategoria o tej nazwie już istnieje" });
    } else {
      res.status(500).send({ error: "Nie można utworzyć kategorii" });
    }
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const updateResponse = await Category.update(
      { CategoryName },
      { where: { CategoryID: req.params.id } }
    );

    if (updateResponse[0] === 0) {
      return res
        .status(404)
        .send({ error: "Nie znaleziono kategorii do aktualizacji" });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).send(updatedCategory);
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
