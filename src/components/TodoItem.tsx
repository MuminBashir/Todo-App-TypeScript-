import {
  BorderColorRounded,
  DeleteRounded,
  DownloadDoneRounded,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PropType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    title: string,
    isEmpty: boolean
  ) => void;
};

const TodoItem = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}: PropType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [titleVal, setTitleVal] = useState<TodoItemType["title"]>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editHandler(todo.id, titleVal, titleVal === "" ? true : false);
              if (titleVal !== "") {
                setEditActive(false);
              }
            }}
          >
            <TextField
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
            />
          </form>
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => {
            completeHandler(todo.id);
          }}
        />
        <Button
          onClick={() => {
            if (editActive) {
              editHandler(todo.id, titleVal, titleVal === "" ? true : false);
            }
            if (titleVal !== "") {
              setEditActive(!editActive);
            }
          }}
        >
          {editActive ? <DownloadDoneRounded /> : <BorderColorRounded />}
        </Button>
        <Button
          onClick={() => {
            deleteHandler(todo.id);
          }}
        >
          <DeleteRounded />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
