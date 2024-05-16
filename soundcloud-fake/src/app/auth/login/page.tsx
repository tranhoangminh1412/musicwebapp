"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useUserProfileContext } from "@/contexts/ProfileContext";
import { useAuthContext } from "@/contexts/AuthContext";
// import useLocalStorage from "@/hooks/useLocalStorage"
import { useLocalStorage } from "usehooks-ts";

import Link from "next/link";
import Image from "next/image";

import messages from "@/locales/messages.json";

import {
  validateRequired,
  validateUsername,
  validatePassword,
  checkFocusAllInput,
  validateEmail,
} from "@/utils/validate";

import IcUsername from "@/assets/app/username.svg";
import IcPassword from "@/assets/app/password.svg";

import loginImage from "@/assets/app/login-image.png";
import InpTextField from "@/components/share/InpTextField/InpTextField";
import FormCheckbox from "@/components/share/FormCheckbox/FormCheckBox";
import CaseActionButton from "@/components/share/CaseActionBtn/CaseActionBtn";

const app = require("@/firebaseConfig");

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { users } from "@/constants/users.constant";
import { setUserProfileContext } from "@/utils/auth";

const auth = getAuth();
const GAuthProvider = new GoogleAuthProvider();
GAuthProvider.addScope("email");
GAuthProvider.addScope("profile");

export interface ILoginPageProps {}

interface IGProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export default function LoginPage(props: ILoginPageProps) {
  const router = useRouter();
  const validates = messages.validates;

  const { profile, setProfile } = useUserProfileContext();
  const { authenticated, setAuthenticated } = useAuthContext();

  const formRef = React.useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [shake, setShake] = useState(false)
  const [loginErr, setLoginErr] = useState({
    error: false,
    message: "",
  });

  const errorEmailMessage = React.useMemo(() => {
    let errorMessage = validateEmail(email, validates);
    return errorMessage;
  }, [email]);
  const errorPasswordMessage = React.useMemo(() => {
    let errorMessage = "";
    if (!password)
      errorMessage = validateRequired("Password", password, validates);
    return errorMessage;
  }, [password]);
  const errorPassword = React.useMemo(() => !!errorPasswordMessage, [password]);
  const errorEmail = React.useMemo(() => !!errorEmailMessage, [email]);

  const onSubmit = async () => {
    if (formRef.current) {
      const form: HTMLElement = formRef.current;
      checkFocusAllInput(form);
    }

    // if no error
    if (!errorEmail && !errorPassword) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          setProfile({
            id: user.uid,
            email: user.email,
            fullname: user.displayName,
            password: password,
            avatarUrl: user.photoURL,
          });
          setAuthenticated(true);
          router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " message: " + errorMessage);
          setLoginErr({
            error: true,
            message: errorCode,
          });
          setShake(true)
        });
    }
  };

  const signInWithGoogle = () => {
    console.log("working");
    signInWithPopup(auth, GAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        } else {
          console.log("No Credentials Supplied");
        }
        // The signed-in user info.
        if (result.user) {
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log("setting user profile");
          setProfile({
            id: user.uid,
            email: user.email,
            fullname: user.displayName,
            password: "",
            avatarUrl: user.photoURL,
          });
          setAuthenticated(true);
          router.push("/home")
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(()=>{setTimeout(()=>{setShake(false)},350)},[shake])

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
              placeholder="Email address"
              type="username"
              value={email}
              onChange={setEmail}
              error={errorEmail}
              errorMessage={errorEmailMessage}
            />
            <InpTextField
              icon={IcPassword}
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={errorPassword}
            />
            <FormCheckbox name="remember" onChange={setRemember} />
          </div>
          {loginErr.error == true && (
            <p
              className={`h-[1px] w-full left-0 bottom-0 text-[10px] leading-[15px] text-[#ee5253] ${shake && 'animate-[shake_0.3s_ease-in-out]'} `}
            >
              {loginErr.message == 'auth/invalid-credential' && 'Invalid Credentials'}
            </p>
          )}
          <CaseActionButton
            color="orange"
            text="Submit"
            onClick={onSubmit}
            className="!py-3 !flex-wrap"
          />
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => signInWithGoogle()}
            >
              <FcGoogle className="mr-4" />
              Sign in with Google
            </button>
          </div>
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
