"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import Link from "next/link";
import Image from "next/image";

import IcUsername from "@/assets/app/username.svg";
import IcPassword from "@/assets/app/password.svg";
import IcName from "@/assets/app/address-card.svg";
import IcKey from "@/assets/app/key.svg"
import loginImage from "@/assets/app/login-image.png";

import InpTextField from "@/components/share/InpTextField/InpTextField";
import FormCheckbox from "@/components/share/FormCheckbox/FormCheckBox";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

export interface IRegisterPageProps {}

export default function RegisterPage(props: IRegisterPageProps) {
  const router = useRouter();

  const { profile, setProfile } = useUserProfileContext();

  const formRef = React.useRef(null);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOnChange = () => {};

  return (
    <div className="flex align-middle content-center my-[110px] mx-[260px] ">
      <div className="flex align-middle content-center gap-6 ">
        <Image
          className="object-cover w-[492px] h-[512px]"
          src={loginImage}
          alt=""
        />
        <div className="flex align-middle content-center flex-col gap-6 p-6">
          <h1 className="font-bold text-5xl leading-[72px]">Sign Up</h1>
          <div ref={formRef} className=" gap-6 flex flex-col  ">
          <InpTextField
              icon={IcName}
              placeholder="Full Name"
              type="fullname"
              value=""
              onChange={handleOnChange}
            />
            <InpTextField
              icon={IcUsername}
              placeholder="Username"
              type="username"
              value=""
              onChange={handleOnChange}
            />
            <InpTextField
              icon={IcPassword}
              placeholder="Password"
              type="password"
              value=""
              onChange={handleOnChange}
            />
            <InpTextField
              icon={IcKey}
              placeholder="Username"
              type="username"
              value=""
              onChange={handleOnChange}
            />
            <FormCheckbox name="accept" />
          </div>
          <CaseActionButton
            color="orange"
            text="Send"
            className="!py-3 !flex-wrap"
          />
          <p className="self-center">or <a onClick={() => router.push("/auth/login")} className="text-[#0094FF] cursor-pointer">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}
