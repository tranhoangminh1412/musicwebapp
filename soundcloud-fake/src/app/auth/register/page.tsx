"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import Link from "next/link";
import Image from "next/image";

import messages from "@/locales/messages.json";
import {
  validateRequired,
  validatePassword,
  validateUsername,
  validateEmail,
} from "@/utils/validate";
import { checkFocusAllInput } from "@/utils/validate";

import IcUsername from "@/assets/app/username.svg";
import IcPassword from "@/assets/app/password.svg";
import IcName from "@/assets/app/address-card.svg";
import IcKey from "@/assets/app/key.svg";
import loginImage from "@/assets/app/login-image.png";

import InpTextField from "@/components/share/InpTextField/InpTextField";
import FormCheckbox from "@/components/share/FormCheckbox/FormCheckBox";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

const app = require("@/firebaseConfig");
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { users } from "@/constants/users.constant";

const auth = getAuth();

export interface IRegisterPageProps {}

export default function RegisterPage(props: IRegisterPageProps) {
  const router = useRouter();

  const { profile, setProfile } = useUserProfileContext();

  const formRef = React.useRef(null);

  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeat, setRepeat] = React.useState("");
  const [accept, setAccept] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validates = messages.validates;
  // validate
  const errorFullnameMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!fullname) errorMessage = "Fullname field is required";
    return errorMessage;
  }, [fullname]);
  const errorUsernameMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!username)
      errorMessage = validateRequired("Username", username, validates);
    else if (!!validateUsername(username, validates))
      errorMessage = validateUsername(username, validates);
    return errorMessage;
  }, [username]);
  const errorEmailMessage = React.useMemo(() => {
    let errorMessage = validateEmail(email, validates);
    return errorMessage;
  }, [email]);
  const errorPasswordMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!password)
      errorMessage = validateRequired("Password", password, validates);
    else if (!!validatePassword(password, validates))
      errorMessage = validatePassword(password, validates);
    return errorMessage;
  }, [password]);
  const errorRepeatMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!repeat) errorMessage = "Repeat password";
    else if (repeat != password) errorMessage = "Passwords don't match";
    return errorMessage;
  }, [repeat]);
  const errorFullname = React.useMemo(() => !!errorFullnameMessage, [fullname]);
  const errorRepeat = React.useMemo(() => !!errorRepeatMessage, [repeat]);
  const errorPassword = React.useMemo(() => !!errorPasswordMessage, [password]);
  const errorUsername = React.useMemo(
    () => !!validateUsername(username, validates),
    [username]
  );
  const errorEmail = React.useMemo(() => !!errorEmailMessage, [email]);

  const onSubmit = async () => {
    if (formRef.current) {
      const form: HTMLElement = formRef.current;
      checkFocusAllInput(form);
    }

    // if no error
    if (
      !errorUsername &&
      !errorPassword &&
      !errorFullname &&
      !errorRepeat &&
      accept
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " message: " + errorMessage);
          // ..
        });
      router.push("/home");
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
          <h1 className="font-bold text-5xl leading-[72px]">Sign Up</h1>
          <div ref={formRef} className=" gap-6 flex flex-col  ">
            <InpTextField
              icon={IcName}
              placeholder="Full Name"
              type="fullname"
              value={fullname}
              onChange={setFullname}
              error={errorFullname}
              errorMessage={errorFullnameMessage}
            />
            <InpTextField
              icon={IcUsername}
              placeholder="Email address"
              type="username"
              value={email}
              onChange={setEmail}
              error={errorEmail}
              errorMessage={errorEmailMessage}
            />
            <InpTextField
              icon={IcUsername}
              placeholder="Username"
              type="username"
              value={username}
              onChange={setUsername}
              error={errorUsername}
              errorMessage={errorUsernameMessage}
            />
            <InpTextField
              icon={IcPassword}
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={errorPassword}
              errorMessage={errorPasswordMessage}
            />
            <InpTextField
              icon={IcKey}
              placeholder="Username"
              type="password"
              value={repeat}
              onChange={setRepeat}
              error={errorRepeat}
              errorMessage={errorRepeatMessage}
            />
            <div className="flex relative">
              <p className=" absolute top-[-5px] left-[13px] text-sm leading-[21px] text-[#ee5253]">
                *
              </p>

              <FormCheckbox name="accept" onChange={setAccept} />
            </div>
          </div>
          <CaseActionButton
            color="orange"
            text="Send"
            className="!py-3 !flex-wrap"
            onClick={onSubmit}
          />
          <p className="self-center">
            or{" "}
            <a
              onClick={() => router.push("/auth/login")}
              className="text-[#0094FF] cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
