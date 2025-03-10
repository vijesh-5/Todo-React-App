import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editTodo) {
        await axios.put(`${API_URL}/${editTodo._id}`, {
          title,
          description,
          completed: editTodo.completed,
        });
      } else {
        await axios.post(API_URL, { title, description });
      }
      setTitle("");
      setDescription("");
      setEditTodo(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // Refresh the todo list
    } catch (err) {
      console.error("Error deleting todo:", err.response?.data || err.message);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo._id}`, {
        ...todo,
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Todo App</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> What should i do ?? 🤔</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" Enter before you forget it !! 😭"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>How shold I do it ?? 🫨 </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" go ask some-one i guess 🙂‍↕️"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </Form>

      <ListGroup className="mt-4">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo._id}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
                className="me-3"
              />
              <div>
                <h5
                  className={
                    todo.completed
                      ? "text-muted text-decoration-line-through"
                      : ""
                  }
                >
                  {todo.title}
                </h5>
                <p
                  className={
                    todo.completed
                      ? "text-muted text-decoration-line-through"
                      : ""
                  }
                >
                  {todo.description}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => {
                  setEditTodo(todo);
                  setTitle(todo.title);
                  setDescription(todo.description);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteTodo(todo._id)} // Pass the todo ID
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;
