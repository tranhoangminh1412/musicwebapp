import col from "../app/Col3.svg";

import Image from "next/image";
import * as React from "react";

export interface IColProgressProps {
  activated?: boolean;
}

export default function ColProgress(props: IColProgressProps) {
  const { activated } = props;

  return (
    <div>
      <svg
        width="190"
        height="16"
        viewBox="0 0 190 16"
        fill={activated ? "#FF6B00" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="7"
          width="190"
          height="2"
          fill={activated ? "#FF6B00" : "#E0E0E7"}
        />
      </svg>
    </div>
  );
}
