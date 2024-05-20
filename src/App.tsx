import React, { useRef, useState } from "react";
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

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
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
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  };

  const addTask = (title: string, todolistId: string) => {
    const task = {
      id: v1(),
      title,
      isDone: false,
    };
    let tasks = tasksObj[todolistId];
    let newTask = [task, ...tasks];
    tasksObj[todolistId] = newTask;
    setTasks({ ...tasksObj });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  };

  const changeTodolistTitle = (id: string, newTile: string) => {
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTile;
      setTodolist([...todolists]);
    }
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  };

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todolists.filter((tl) => tl.id !== todolistId);
    setTodolist(filteredTodoList);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  const addTodolist = (title: string) => {
    let todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title,
    };
    setTodolist([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
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

export default App;
