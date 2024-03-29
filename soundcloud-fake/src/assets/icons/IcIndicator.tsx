'use client';

import * as React from "react";
import Image from "next/image";
import IndicatorUnselected from "../app/IndicatorUnselected.svg";
import IndicatorSelected from "../app/IndicatorSelected.svg";
import IndicatorCompleted from "../app/IndicatorCompleted.svg";

export interface IIndicatorProps {
  status: string;
  onClick: () => void;
}

export default function Indicator(props: IIndicatorProps) {
  const { status, onClick } = props;

  return <div onClick={onClick}>
    {status == "unselected" && <Image src={IndicatorUnselected} alt="" />}
    {status == "selected" && <Image src={IndicatorSelected} alt="" />}
    {status == "completed" && <Image src={IndicatorCompleted} alt="" />}
  </div>;
}
