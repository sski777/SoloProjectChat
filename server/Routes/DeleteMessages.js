import pool from "../db.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const route = express.Router();

route.use(express.json());

route.post("/", async (req, res) => {
  try {
    const gettitle = req.body.content;
    const deleteentry = await pool.query(
      "DELETE FROM messages WHERE id = $1 RETURNING *",
      [gettitle]
    );
    const gettable = await pool.query("SELECT * FROM messages");
    res.status(201).json(gettable.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default route;
