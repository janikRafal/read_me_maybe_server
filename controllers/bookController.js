const Book = require("../models/bookModel");
const Category = require("../models/categoryModel");

exports.getBooksBasic = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ["BookID", "BookTitle", "Author"],
    });

    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot fetch books" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot fetch books" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { BookTitle, Author, CategoryID } = req.body;
    const book = await Book.create({ BookTitle, Author, CategoryID });
    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ error: "A book with this title already exists" });
    } else {
      res.status(500).send({ error: "Cannot create book" });
    }
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { BookTitle, Author, CategoryID } = req.body;
    const updateResponse = await Book.update(
      { BookTitle, Author, CategoryID },
      { where: { BookID: req.params.id } }
    );

    if (updateResponse[0] === 0) {
      return res.status(404).send({ error: "Nothing to update" });
    }

    const updatedBook = await Book.findByPk(req.params.id);
    res.status(200).send(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.destroy({ where: { BookID: req.params.id } });
    res.status(200).send({ message: "Book has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot delete book" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Cannot fetch book information" });
  }
};

exports.getBookWithCategoryName = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ["CategoryName"],
        },
      ],
    });

    if (book) {
      const bookWithCategoryName = {
        BookID: book.BookID,
        BookTitle: book.BookTitle,
        Author: book.Author,
        CategoryName: book.Category.CategoryName,
      };

      res.status(200).send(bookWithCategoryName);
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Cannot fetch book information with category name",
    });
  }
};
