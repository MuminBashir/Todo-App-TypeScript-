import {
  Container,
  AppBar,
  Typography,
  Toolbar,
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import { getTodos, saveTodos } from "./utils/storage";
import Footer from "./components/Footer";

interface AlertProps {
  key: string;
  severity: "success" | "error" | "info" | "warning";
  message: string;
}

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");
  const [snackbarQueue, setSnackbarQueue] = useState<AlertProps[]>([]);

  const showSnackbarAlert = (
    severity: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setSnackbarQueue((prevQueue) => [
      ...prevQueue,
      {
        key: `${new Date().getTime() + Math.random()}`,
        severity,
        message,
      },
    ]);
  };

  const handleCloseSnackbar = (key: string) => {
    setSnackbarQueue((prevQueue) =>
      prevQueue.filter((item) => item.key !== key)
    );
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title === "") {
      showSnackbarAlert("error", "Title cannot be empty!");
    } else {
      const newTodo: TodoItemType = {
        title: title,
        isCompleted: false,
        id: String(Math.random() * 1000),
      };

      setTodos((prev) => [...prev, newTodo]);
      setTitle("");
      showSnackbarAlert("success", "Todo added successfully!");
    }
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    showSnackbarAlert("success", "Todo deleted successfully!");
  };

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
        if (todo.isCompleted) {
          showSnackbarAlert("info", "Todo marked as complete!");
        } else {
          showSnackbarAlert("warning", "Todo marked as incomplete!");
        }
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const editHandler = (
    id: TodoItemType["id"],
    title: string,
    isEmpty: boolean
  ): void => {
    if (isEmpty) {
      showSnackbarAlert("error", "Title cannot be empty!");
    } else {
      const newTodos: TodoItemType[] = todos.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
          showSnackbarAlert("success", "Todo updated successfully!");
        }
        return todo;
      });

      setTodos(newTodos);
    }
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <>
      <Container maxWidth="sm" sx={{ height: "92vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography textAlign={"center"} width={"100%"} variant="h6">
              Todo App
            </Typography>
          </Toolbar>
        </AppBar>

        <Stack
          height={"70%"}
          direction={"column"}
          spacing={"1rem"}
          p={"1rem"}
          overflow={"auto"}
        >
          {todos.map((i) => (
            <TodoItem
              key={i.id}
              todo={i}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              editHandler={editHandler}
            />
          ))}
        </Stack>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label={"Add Task"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ margin: "0.5rem 0" }}
          >
            ADD
          </Button>
        </form>
        {snackbarQueue.map((alert) => (
          <Snackbar
            key={alert.key}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={true}
            autoHideDuration={4000}
            onClose={() => handleCloseSnackbar(alert.key)}
          >
            <Alert
              onClose={() => handleCloseSnackbar(alert.key)}
              severity={alert.severity}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default App;
