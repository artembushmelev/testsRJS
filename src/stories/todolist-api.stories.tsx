import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistsApi } from "../API/todolists-api";

export default {
  title: "API",
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "69781789-c283-4f74-ad23-e722222838e1",
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistsApi.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsApi.createTodolists("Artem Bushmelev").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "33bb379d-c1f7-470e-93e8-d667b6267a62";
    todolistsApi.deleteTodolists(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "5d8dafff-370b-4484-9f27-9b2f32973395";
    todolistsApi.updateTodolists(todolistId, "Albina Varina").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = () => {
    todolistsApi.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <button onClick={getTasks}>Get Task</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const DeleteTask = () => {
    todolistsApi.deleteTasks(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={DeleteTask}>delete Task</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  const DeleteTask = () => {
    todolistsApi.createTask(todolistId, taskTitle).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={DeleteTask}>Create Task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  //   const updateTask = () => {
  //     todolistsApi.updateTask(todolistId, taskId , {deadline: null,d}).then((res) => {
  //       setState(res.data);
  //     });
  //   };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder="taskId"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        {/* <button onClick={updateTask}>Create Task</button> */}
      </div>
    </div>
  );
};
