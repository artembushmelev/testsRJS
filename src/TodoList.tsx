import { ChangeEvent, useCallback } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { Task } from "./components/Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  addTask: (value: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeTaskTitle: (id: string, newValue: string, todolistId: string) => void;
};

export const TodoList = React.memo((props: TodoListPropsType) => {
  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  const removeTodoList = () => props.removeTodoList(props.id);

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.id, props.changeTodolistTitle]
  );

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  let tasksForTodoList = props.tasks;

  if (props.filter === "completed") {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === true);
  }
  if (props.filter === "active") {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="">
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {tasksForTodoList.map((t) => (
          <Task
            task={t}
            changeStatus={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            todolistId={props.id}
            key={t.id}
          />
        ))}
      </ul>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
