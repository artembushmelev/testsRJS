import { Button, IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  let [taskTitle, setTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !(taskTitle.trim() === "")) {
      props.addItem(taskTitle);
      setTaskTitle("");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const addTask = () => {
    if (taskTitle.trim() !== "") {
      props.addItem(taskTitle);
      setTaskTitle("");
      setError(null);
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <TextField
        label="Введите задачу"
        variant="standard"
        error={!!error}
        helperText={error}
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={onChangeHandler}
        onKeyUp={onKeyPressHandler}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <AddIcon />
      </IconButton>
    </div>
  );
});
