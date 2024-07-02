import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { TaskType } from "../Todolist";
import { ChangeEvent, useCallback } from "react";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

export type TaskPropsType = {
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeTaskTitle: (id: string, newValue: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todolistId
    );
  };

  const removeTask = () => {
    props.removeTask(props.task.id, props.todolistId);
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props.changeTaskTitle, props.task.id, props.todolistId]
  );

  return (
    <div
      key={props.task.id}
      className={props.task.isDone === true ? "is-done" : ""}
    >
      <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} />
      <EditableSpan value={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </div>
  );
});
