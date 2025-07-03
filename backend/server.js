import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import { connectToDatabase } from "./config/db.js";
import { Book } from "./model/book.model.js";

const app = express();

app.use(express.json());

app.post("/api/v1/books", async (req, res) => {
  const { title, subtitle, author, genre, cover } = req.body;

  try {
    const book = new Book({ title, subtitle, author, genre, cover });
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    console.error("Error saving book: ", error);
    res.status(500).json({ success: false, error: "Error saving book" });
  }
});

app.get("/api/v1/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books: ", error);
    res.status(500).json({ sucess: false, error: "Error fetching books" });
  }
});

app.get("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ sucess: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    res.status(200).json({ sucess: true, data: book });
  } catch (error) {
    console.error("Error fetching book: ", error);
    res.status(500).json({ success: false, error: "Error fetching book" });
  }
});

app.put("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, author, genre, cover } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ sucess: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, subtitle, author, genre, cover },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book: ", error);
    res.status(500).json({ success: false, error: "Error updating book" });
  }
});

app.delete("/api/v1/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ sucess: false, error: "Invalid ID" });
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting book: ", error);
    res.status(500).json({ success: false, error: "Error deleting book" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectToDatabase();
});


//bT7bbSfAVr45l25D
//MONGO_URI=mongodb+srv://cunhasilvadaniel:bT7bbSfAVr45l25D@cluster0.i7cgenf.mongodb.net/MERN?retryWrites=true&w=majority&appName=Cluster0