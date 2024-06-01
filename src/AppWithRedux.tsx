import React, { useReducer, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AddTodolistAC,
  ChangeTodolistTitleAC,
  ChangeTotodlistFilterAC,
  RemoveTodolistAC,
  todolistsReducer,
} from "./state/todolistsReducer/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasksReducer/task-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/storeRedux/store";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispath = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todolists
  );

  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId);
    dispath(action);
  };

  const addTask = (title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispath(action);
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispath(action);
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispath(action);
  };

  const changeTodolistTitle = (id: string, newTile: string) => {
    dispath(ChangeTodolistTitleAC(newTile, id));
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispath(ChangeTotodlistFilterAC(value, todolistId));
  };

  let removeTodoList = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispath(action);
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title);
    dispath(action);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={7} style={{ padding: "20px" }}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasks[tl.id];

            if (tl.filter === "completed") {
              tasksForTodoList = tasks[tl.id].filter((t) => t.isDone === true);
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasks[tl.id].filter((t) => t.isDone === false);
            }
            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
