const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      Username: username,
      Email: email,
      Password: hashedPassword,
    });

    res.status(201).send({ userId: user.UserID });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Rejestracja nie powiodła się" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      return res.status(400).send({ error: "Użytkownik nie istnieje" });
    }

    if (await bcrypt.compare(password, user.Password)) {
      const accessToken = jwt.sign({ userId: user.UserID }, SECRET_KEY);
      res.send({ accessToken });
    } else {
      res.status(403).send({ error: "Niepoprawne hasło" });
    }
  } catch (error) {
    res.status(500).send({ error: "Logowanie nie powiodło się" });
  }
};
