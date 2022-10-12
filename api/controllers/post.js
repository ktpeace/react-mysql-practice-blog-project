import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const cat = req.query.cat;
  const q = cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";
  db.query(q, [cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const id = req.params.id;
  //
  const q =
    "SELECT posts.id, `username`, `title`, `descr`, posts.img, users.img as userImg, `category`, `date` FROM users JOIN posts ON users.id=posts.user_id where posts.id=?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json("You must be logged in to make a post.");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO posts(title, descr, img, category, date, user_id) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.title,
      req.body.descr,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res
      .status(401)
      .json("You do not have permission to edit this post.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const query =
      "UPDATE posts SET title=?, descr=?, img=?, category=? WHERE id = ? AND user_id = ?";

    const values = [req.body.title, req.body.descr, req.body.img, req.body.cat];

    db.query(query, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res
      .status(401)
      .json("You do not have permission to delete this post.");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id=? AND user_id = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) res.status(403).json("You can only delete your own posts!");
      return res.json("Post has been deleted.");
    });
  });
};
