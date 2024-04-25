
import * as React from "react";

export interface IIcHeartProps {
  color?: string;
  size?: string;
  className?: string;
  active?: Boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function IcHeart(props: IIcHeartProps) {
  const {
    color = "#979797",
    size = "20",
    className = "",
    active = false,
    onClick,
  } = props;

  return (
    <div onClick={onClick} >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${className}`}
      >
        <g clipPath="url(#clip0_79_2343)">
          <path
            d="M18.0586 2.44533C15.918 0.621109 12.7344 0.949234 10.7695 2.97658L9.99999 3.76955L9.23046 2.97658C7.26952 0.949234 4.08202 0.621109 1.9414 2.44533C-0.511728 4.53908 -0.640634 8.29689 1.55468 10.5664L9.11327 18.3711C9.60155 18.875 10.3945 18.875 10.8828 18.3711L18.4414 10.5664C20.6406 8.29689 20.5117 4.53908 18.0586 2.44533Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_79_2343">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
