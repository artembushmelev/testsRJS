import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  addTask: (value: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, newValue: string, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
};

export const TodoList = (props: TodoListPropsType) => {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const removeTodoList = () => props.removeTodoList(props.id);

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div className="">
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />

        <button onClick={removeTodoList}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li className={t.isDone === true ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <button
                onClick={() => {
                  props.removeTask(t.id, props.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
