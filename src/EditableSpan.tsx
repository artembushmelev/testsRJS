import { TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !(title.trim() === "")) {
      props.onChange(title);
      setTitle(props.title);
      setEditMode(false);
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      onKeyUp={onKeyPressHandler}
      value={title}
      autoFocus
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});
