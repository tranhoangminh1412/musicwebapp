"use client";

import * as React from "react";

import Image from "next/image";


export interface IAuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: IAuthLayoutProps) {
  const { children } = props;

  return (
    <div
      className={`flex items-center justify-center `}
    >
    {children}
    </div>
  );
}
