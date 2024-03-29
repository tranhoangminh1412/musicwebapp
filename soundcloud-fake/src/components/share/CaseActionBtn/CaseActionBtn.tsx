import Image, { StaticImageData } from "next/image";
import * as React from "react";

export interface ICaseActionButtonProps {
  color?: string;
  text?: string;
  className?:string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: StaticImageData;
}

export default function CaseActionButton(props: ICaseActionButtonProps) {
  const { label, color, text, className, onClick = () => {} } = props;

  const classes = `${
    color == "orange" ? "bg-btnOrange" : "border-[#E9E9E9] border-[1px] border-solid"
  }
  ${className}
  rounded flex justify-center text-center py-[9.5px] px-[29px] gap-[12px]`;

  return (
    <button onClick={onClick} className={classes}>
      {label && <Image src={label} alt="" />}
      <span className='text-btnTextWhite text-nowrap align-middle self-center'>{text}</span>
    </button>
  );
}
