import * as React from "react";

export interface IFormCheckboxProps {
  name: string;
  ref?: null;
  onChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormCheckbox(props: IFormCheckboxProps) {
  const { name, ref, onChange } = props;

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    onChange(e.target.checked)
  }

  return (
    <div className="flex gap-[16px]">
      <input className="" type="checkbox" name={name} id={name} ref={ref} onChange={(e)=>{handleOnChange(e)}}/>
      <label htmlFor={name} className="text-sm leading-[21px] font-normal">
        {name == "remember" ? "Remember me" : `I accept the `}
        {name == "remember" ? <></> : <a className="text-[#0094FF]" href="">Term of Use</a>}
      </label>
    </div>
  );
}
