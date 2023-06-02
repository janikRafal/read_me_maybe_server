const Book = require("../models/bookModel");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie można pobrać książek" });
  }
};
