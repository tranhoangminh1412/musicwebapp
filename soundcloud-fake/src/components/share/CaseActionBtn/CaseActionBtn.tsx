import * as React from "react";

export interface ICaseActionButtonProps {
  color?: string;
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CaseActionButton(props: ICaseActionButtonProps) {
  const { color, text, onClick = () => {} } = props;

  const classes = `${
    color == "orange" ? "bg-btnOrange" : "bg-transparent border-#E9E9E9 border-solid"
  }
  rounded-sm flex items-center content-center text-center`;

  const spanClasses = `text-btnTextWhite`;

  const onClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button onClick={onClickEvent} className={classes}>
      <span className={spanClasses}>{text}</span>
    </button>
  );
}
