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
    const { BookTitle, Author, CategoryID } = req.body;
    const book = await Book.create({ BookTitle, Author, CategoryID });
    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ error: "Książka o tym tytule już istnieje" });
    } else {
      res.status(500).send({ error: "Nie można utworzyć książki" });
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
      return res
        .status(404)
        .send({ error: "Nie znaleziono książki do aktualizacji" });
    }

    const updatedBook = await Book.findByPk(req.params.id);
    console.log(updatedBook);
    res.status(200).send(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można zaktualizować książki" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.destroy({ where: { BookID: req.params.id } });
    res.status(200).send({ message: "Książka została usunięta" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można usunąć książki" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({ error: "Książka nie została znaleziona" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać informacji o książce" });
  }
};
