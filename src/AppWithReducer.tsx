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

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispathToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, dispathToTaskReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redax", isDone: false },
    ],

    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId);
    dispathToTaskReducer(action);
  };

  const addTask = (title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispathToTaskReducer(action);
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispathToTaskReducer(action);
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispathToTaskReducer(action);
  };

  const changeTodolistTitle = (id: string, newTile: string) => {
    dispathToTodolistsReducer(ChangeTodolistTitleAC(newTile, id));
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispathToTodolistsReducer(ChangeTotodlistFilterAC(value, todolistId));
  };

  let removeTodoList = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId);
    dispathToTaskReducer(action);
    dispathToTodolistsReducer(action);
  };

  const addTodolist = (title: string) => {
    const action = AddTodolistAC(title);
    dispathToTaskReducer(action);
    dispathToTodolistsReducer(action);
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
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodoList = tasksObj[tl.id].filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksObj[tl.id].filter(
                (t) => t.isDone === false
              );
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

export default AppWithReducer;
