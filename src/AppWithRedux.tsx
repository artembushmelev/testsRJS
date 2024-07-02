import React, { useCallback, useReducer, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
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

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      const action = removeTaskAC(id, todolistId);
      dispath(action);
    },
    [dispath]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      const action = addTaskAC(title, todolistId);
      dispath(action);
    },
    [dispath]
  );

  const changeStatus = useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      const action = changeTaskStatusAC(taskId, isDone, todolistId);
      dispath(action);
    },
    [dispath]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      const action = changeTaskTitleAC(taskId, newTitle, todolistId);
      dispath(action);
    },
    [dispath]
  );

  const changeTodolistTitle = useCallback(
    (id: string, newTile: string) => {
      dispath(ChangeTodolistTitleAC(newTile, id));
    },
    [dispath]
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispath(ChangeTotodlistFilterAC(value, todolistId));
    },
    [dispath]
  );

  let removeTodoList = useCallback(
    (todolistId: string) => {
      const action = RemoveTodolistAC(todolistId);
      dispath(action);
    },
    [dispath]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = AddTodolistAC(title);
      dispath(action);
    },
    [dispath]
  );

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
            // let allTodolistTasks = tasks[tl.id];
            let tasksForTodoList = tasks[tl.id];
            return (
              <Grid key={tl.id} item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodoList}
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
