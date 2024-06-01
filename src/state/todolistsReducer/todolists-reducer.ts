import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../../App";

export type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  title: string;
  id: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type ActionTypes =
  | RemoveTodoListActionType
  | AddTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

export const todolistsReducer = (
  state: Array<TodoListType>,
  action: ActionTypes
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [
        ...state,
        { id: action.todolistId, title: action.title, filter: "all" },
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((el) => {
        return el.id === action.id ? { ...el, title: action.title } : el;
      });
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((el) => {
        return el.id === action.id ? { ...el, filter: action.filter } : el;
      });
    }
    default:
      throw new Error("I dont understand this action type");
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodoListActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodolistAC = (
  newTodolistTitle: string
): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1() };
};

export const ChangeTodolistTitleAC = (
  newTodolistTitle: string,
  todolistId: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId,
    title: newTodolistTitle,
  };
};

export const ChangeTotodlistFilterAC = (
  newFilter: FilterValuesType,
  todolistId: string
): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter: newFilter,
  };
};
