const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SECRET_KEY = "tajny_klucz";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("HASHOWANE HASLO:", hashedPassword);
    const user = await User.create({
      Username: username,
      Email: email,
      Password: hashedPassword,
    });

    console.log("USER", user);
    res.status(201).send({ userId: user.UserID });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Rejestracja nie powiodła się" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Sprawdzanie użytkownika w bazie danych
    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      return res.status(400).send({ error: "Użytkownik nie istnieje" });
    }

    // Sprawdzanie hasła
    if (await bcrypt.compare(password, user.Password)) {
      // Tworzenie JWT
      const accessToken = jwt.sign({ userId: user.UserID }, SECRET_KEY);
      res.send({ accessToken });
    } else {
      res.status(403).send({ error: "Niepoprawne hasło" });
    }
  } catch (error) {
    res.status(500).send({ error: "Logowanie nie powiodło się" });
  }
};
