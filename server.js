const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = require("./app");

// Sprawdź połączenie z bazą danych
db.authenticate()
  .then(() => {
    console.log("Połączono z bazą danych.");
  })
  .catch((err) => {
    console.error("Błąd połączenia z bazą danych:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
