import express from "express";
import Database from "better-sqlite3";
import fetch from "node-fetch";
import cors from "cors";

const db = new Database("../todoList.db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/todo/get", (req, res) => {
  const query = db.prepare("SELECT * FROM Todos");
  const todos = query.all();
  console.log(todos);
  res.json(todos);
});

app.post("/api/todo/post", (req, res) => {
  const { todoName, todoDescription } = req.body;

  if (!todoName || !todoDescription) {
    return res
      .status(400)
      .json({ error: "Header and description are required" });
  }

  const query = db.prepare(
    `INSERT INTO Todos (todoName, todoDescription) VALUES (?, ?)`
  );
  const result = query.run(todoName, todoDescription);

  res
    .status(201)
    .json({ message: "Todo added successfully", id: result.lastInsertRowid });
});

app.put("/api/todo/update/:id", (req, res) => {
  let { completed } = req.body;
  const { id } = req.params;

  console.log("Received ID:", id);
  console.log("Received completed status:", completed);

  if (!id) {
    return res.status(400).json({ error: "Missing todo ID" });
  }

  completed = completed ? 1 : 0;

  const query = db.prepare("UPDATE Todos SET completed=? WHERE todoId=?");
  const result = query.run(completed, id);

  res.json({ message: "User updated successfully" });
});

app.delete("/api/todo/delete/:id", (req, res) => {
  const { id } = req.params;

  console.log(`Attempting to delete todo with id: ${id}`);

  try {
    const query = db.prepare("DELETE FROM Todos WHERE todoId=?");
    const response = query.run(id);

    if (response.changes === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
