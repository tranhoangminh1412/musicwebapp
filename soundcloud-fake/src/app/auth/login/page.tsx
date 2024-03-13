"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import Link from "next/link";
import Image from "next/image";

import messages from "@/locales/messages.json";

import {
  validateRequired,
  validateUsername,
  validatePassword,
  checkFocusAllInput,
} from "@/utils/validate";

import IcUsername from "@/assets/app/username.svg";
import IcPassword from "@/assets/app/password.svg";

import loginImage from "@/assets/app/login-image.png";
import InpTextField from "@/components/share/InpTextField/InpTextField";
import FormCheckbox from "@/components/share/FormCheckbox/FormCheckBox";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const router = useRouter();
  const validates = messages.validates;

  const { profile, setProfile } = useUserProfileContext();

  const formRef = React.useRef(null);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // validate
  const errorUsernameMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!username)
      errorMessage = validateRequired("Username", username, validates);
    else if (!!validateUsername(username, validates))
      errorMessage = validateUsername(username, validates);
    return errorMessage;
  }, [username]);
  const errorPasswordMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!password)
      errorMessage = validateRequired("Password", password, validates);
    else if (!!validatePassword(password, validates))
      errorMessage = validatePassword(password, validates);
    return errorMessage;
  }, [password]);
  const errorPassword = React.useMemo(() => !!errorPasswordMessage, [password]);
  const errorUsername = React.useMemo(
    () => !!validateUsername(username, validates),
    [username]
  );

  const onSubmit = async () => {
    if (formRef.current) {
      const form: HTMLElement = formRef.current;
      checkFocusAllInput(form);
    }

    // if no error
    if (!errorUsername && !errorPassword) {
      router.push("/");
    }
  };

  return (
    <div className="flex align-middle content-center my-[110px] mx-[260px] ">
      <div className="flex align-middle content-center gap-6 ">
        <Image
          className="object-cover w-[492px] h-[512px]"
          src={loginImage}
          alt=""
        />
        <div className="flex align-middle content-center flex-col gap-6 p-6">
          <h1 className="font-bold text-5xl leading-[72px]">Sign In</h1>
          <div ref={formRef} className=" gap-6 flex flex-col  ">
            <InpTextField
              icon={IcUsername}
              placeholder="Username"
              type="username"
              value=""
              onChange={setUsername}
              error={errorUsername}
              errorMessage={errorUsernameMessage}
            />
            <InpTextField
              icon={IcPassword}
              placeholder="Password"
              type="password"
              value=""
              onChange={setPassword}
              error={errorPassword}
              errorMessage={errorPasswordMessage}
            />
            <FormCheckbox name="remember" />
          </div>
          <CaseActionButton
            color="orange"
            text="Submit"
            onClick={onSubmit}
            className="!py-3 !flex-wrap"
          />
          <p className="self-center">
            or{" "}
            <a
              onClick={() => router.push("/auth/register")}
              className="text-[#0094FF] cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
