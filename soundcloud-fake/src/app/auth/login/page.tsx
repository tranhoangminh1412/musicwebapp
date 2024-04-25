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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { users } from "@/constants/users.constant";

const auth = getAuth();

export interface ILoginPageProps {}

const clientId =
  "752827926431-6n24u15f6k9al524t0j9hpa2bi24f4f9.apps.googleusercontent.com";

interface UserProfile {
  access_token: string;
  // Add other properties as needed
}

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

  const [Gprofile, GsetProfile] = useState<IGProfile | null>(null);
  const { profile, setProfile } = useUserProfileContext();
  const { authenticated, setAuthenticated } = useAuthContext();
  // const [value, setValue] = useLocalStorage("authStatus","0")
  // const [authStatus,setAuthStatus] = useState(value)

  const formRef = React.useRef(null);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = useLocalStorage("scf_token", "");

  // const saveToLocalStorage = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault()
  //   setValue(authStatus)
  // }
  // const agent = new https.Agent({
  //   rejectUnauthorized: false,
  // });

  // validate
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
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " message: " + errorMessage);
        });
      router.push("/home");
    }
  };

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // });

  const onSuccess = (res: any) => {
    console.log("LOGIN SUCCESS! Current user: res");
    setAuthenticated(true);
    setProfile({
      id: res.profileObj.googleId,
      username: res.profileObj.email,
      avatarUrl: res.profileObj.imageUrl,
      name: res.profileObj.name,
    });
    router.push("/home");
  };

  const onFailure = () => {
    console.log("LOGIN FAILED! res: res");
  };

  const [user, setUser] = useState<string>();

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      setUser(access_token);
      // setAuthStatus("1");
      console.log(access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("LOGIN SUCCESS! Current user: res");
          GsetProfile(res.data);
          // saveToLocalStorage;
        })
        .catch((err) => console.log(err));
      console.log("access_token: " + user);
    }
  }, [user]);

  useEffect(() => {
    if (Gprofile) {
      setAuthenticated(true);
      setProfile({
        id: Gprofile.id,
        username: Gprofile.email,
        avatarUrl: Gprofile.picture,
        name: Gprofile.name,
      });
      const postData = async () => {
        try {
          const response = await axios.post("/middleware", { authStatus: "1" });
          console.log("POST request successful:", response.data);
        } catch (error) {
          console.error("Error sending POST request:", error);
        }
      };
      console.log("Sending POST Data..");
      postData();
      router.push("/home");
    }
  }, [Gprofile]);

  React.useEffect(() => {
    setToken("");
    setProfile(null);
  }, []);

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
              errorMessage={errorPasswordMessage}
            />
            <FormCheckbox name="remember" onChange={setRemember} />
          </div>
          <CaseActionButton
            color="orange"
            text="Submit"
            onClick={onSubmit}
            className="!py-3 !flex-wrap"
          />
          {/* <div className="self-center">or Sign in with Google</div> */}
          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
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
