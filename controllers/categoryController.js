const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot fetch categories" });
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
      res
        .status(400)
        .send({ error: "A category with this name already exists" });
    } else {
      res.status(500).send({ error: "Cannot create category" });
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
      return res.status(404).send({ error: "Nothing to update" });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).send(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({ where: { CategoryID: req.params.id } });
    res.status(200).send({ message: "Category has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot delete category" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot fetch category information" });
  }
};

exports.getCategoriesWithBooks = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Book,
          attributes: ["BookID", "BookTitle", "Author"],
        },
      ],
    });

    let categoriesWithBooks = categories.map((category) => {
      return {
        CategoryID: category.CategoryID,
        CategoryName: category.CategoryName,
        Books: category.Books.map((book) => {
          return {
            BookID: book.BookID,
            BookTitle: book.BookTitle,
            Author: book.Author,
          };
        }),
      };
    });

    res.status(200).send(categoriesWithBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Cannot fetch information about categories with books",
    });
  }
};
