import { v1 } from "uuid";
import { TasksStateType } from "../../App";
import {
  AddTodolistActionType,
  RemoveTodoListActionType,
} from "../todolistsReducer/todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};
export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

export type ChangeStatusActionType = {
  type: "CHANGE-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};
export type changeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  newTitle: string;
  todolistId: string;
};

export type ActionTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodoListActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (el) => el.id !== action.taskId
        ),
      };
    }
    case "ADD-TASK": {
      const newTask = { id: v1(), title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    case "CHANGE-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId ? { ...el, isDone: action.isDone } : el
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId ? { ...el, title: action.newTitle } : el
        ),
      };
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I dont understand this action type");
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeStatusActionType => {
  return { type: "CHANGE-STATUS", taskId, isDone, todolistId };
};

export const changeTaskTitleAC = (
  taskId: string,
  newTitle: string,
  todolistId: string
): changeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId };
};
