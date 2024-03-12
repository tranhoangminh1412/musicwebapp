import * as React from "react";

export interface IFormCheckboxProps {
  name: string;
  value: string;
  ref? : null;
}

export default function FormCheckbox(props: IFormCheckboxProps) {
  const {  value, name, ref} = props;

  let text = {
    remember: "Remember me",
    accept: `I accept the ${<a href="">Term of Use</a>}`
  }

  return (
    <div>
      <input className="" type="checkbox" name={name} value={value} id={name} ref={ref} />
      <label htmlFor={name}>{name=="remember" ? text.remember : text.accept}</label>
    </div>
  );
}
