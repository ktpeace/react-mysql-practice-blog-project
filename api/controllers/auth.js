import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemon from "nodemon";

export const register = (req, res) => {
  // CHECK IF USERNAME/EMAIL EXISTS
  const userQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(userQuery, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);

    if (data.length) return res.status(409).json("User already exists!");
    // HASH PW & CREATE USER
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery =
      "INSERT INTO users(`username`, `email`, `password`) VALUES(?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  // CHECK USERNAME
  const userQuery = "SELECT * FROM users WHERE username = ?";
  db.query(userQuery, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found.");

    // CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password.");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...otherData } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  });
};

export const logout = (req, res) => {
  console.log("hi");
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
