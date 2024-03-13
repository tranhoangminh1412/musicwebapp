import * as React from "react";

export interface IFormCheckboxProps {
  name: string;
  ref?: null;
}

export default function FormCheckbox(props: IFormCheckboxProps) {
  const { name, ref } = props;

  let text = {
    remember: "Remember me",
    accept: `I accept the ${<a href="">Term of Use</a>}`,
  };

  return (
    <div className="flex gap-[16px]">
      <input className="" type="checkbox" name={name} id={name} ref={ref} />
      <label htmlFor={name} className="text-sm leading-[21px] font-normal">
        {name == "remember" ? "Remember me" : `I accept the `}
        {name == "remember" ? <></> : <a className="text-[#0094FF]" href="">Term of Use</a>}
      </label>
    </div>
  );
}
