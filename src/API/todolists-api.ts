import axios from "axios";
import React from "react";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "69781789-c283-4f74-ad23-e722222838e1",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolists(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title: title,
    });
  },
  deleteTodolists(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolists(id: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${id}`, { title: title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTasks(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks`,
      { title: title }
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put;
  },
};
