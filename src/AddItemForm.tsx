import { useState } from "react";

type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void;
  id: string;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  let [taskTitle, setTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !(taskTitle.trim() === "")) {
      props.addTask(taskTitle, props.id);
      setTaskTitle("");
    }
  };

  const addTask = () => {
    if (taskTitle.trim() === "") {
      props.addTask(taskTitle, props.id);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={(e) => {
          setTaskTitle(e.currentTarget.value);
        }}
        onKeyUp={onKeyPressHandler}
      />
      <button
        onClick={addTask}
        disabled={!taskTitle || !(taskTitle.length <= 15)} // disbled = false
      >
        +
      </button>
      {taskTitle.length > 5 && <div>stop</div>}
    </div>
  );
};
