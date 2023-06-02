const Book = require("../models/bookModel");

exports.getBooksBasic = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ["BookID", "BookTitle", "Author"],
    });

    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać książek" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać książek" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { BookTitle, Author, ISBN, CategoryID } = req.body;
    const book = await Book.create({ BookTitle, Author, ISBN, CategoryID });
    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można utworzyć książki" });
  }
};
