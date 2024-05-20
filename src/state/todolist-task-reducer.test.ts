import { TasksStateType, TodoListType } from "../App";
import { tasksReducer } from "./tasksReducer/task-reducer";
import {
  AddTodolistAC,
  todolistsReducer,
} from "./todolistsReducer/todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = AddTodolistAC("new toddolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolist).toBe(action.todolistId);
});
