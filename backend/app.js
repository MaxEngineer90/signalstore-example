const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // CORS aktivieren
app.use(express.json()); // Body-Parser für JSON-Daten

// Dummy-Todos als Anfangsdaten
let todos = [
  { id: 1, title: "Todo 1", completed: false },
  { id: 2, title: "Todo 2", completed: false },
  { id: 3, title: "Todo 3", completed: true },
  { id: 4, title: "Todo 4", completed: false },
  { id: 5, title: "Todo 5", completed: false },
  { id: 6, title: "Todo 6", completed: true },
];

// Dummy-Daten für Books, Authors und Categories
const books = [
  { id: 1, title: "Book 1", authorId: 1, categoryId: 1 },
  { id: 2, title: "Book 2", authorId: 2, categoryId: 2 },
  { id: 3, title: "Book 3", authorId: 1, categoryId: 2 },
];

const authors = [
  { id: 1, name: "Author 1", birthYear: 1970 },
  { id: 2, name: "Author 2", birthYear: 1980 },
];

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
];

// GET: Alle Todos abrufen
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET: Ein Todo anhand der ID abrufen
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// POST: Ein neues Todo erstellen
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1; // einfache ID-Generierung
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT: Ein bestehendes Todo aktualisieren
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === todoId);
  if (todoIndex >= 0) {
    const updatedTodo = { ...todos[todoIndex], ...req.body };
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// DELETE: Ein Todo löschen
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === todoId);
  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1); // Todo aus dem Array entfernen
    res.status(204).send(); // Erfolgreich ohne Inhalt
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// GET Controller für Books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET Controller für Authors
app.get("/authors", (req, res) => {
  res.json(authors);
});

// GET Controller für Categories
app.get("/categories", (req, res) => {
  res.json(categories);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
