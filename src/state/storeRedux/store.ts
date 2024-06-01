import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "../todolistsReducer/todolists-reducer";
import { tasksReducer } from "../tasksReducer/task-reducer";
import { TasksStateType, TodoListType } from "../../AppWithRedux";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore

window.store = store;
