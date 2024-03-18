"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import IcUnion from "@/assets/icons/IcUnion";

import bgAuth from "@/assets/background/bg-auth.png";
import bgMain from "@/assets/background/bg-main.png";

import styles from "./Layout.module.scss";
import { Providers } from "@/providers/provider";

import { getUserProfile } from "@/api/api";

import {
  UserProfileContext,
  useUserProfileContext,
} from "@/contexts/AuthContext";
import { IResUserProfile } from "@/types/auth.type";

export interface IGlobalMainPageProps {
  children: React.ReactNode;
}

export default function GlobalMainPage(props: IGlobalMainPageProps) {
  const { children } = props;

  const { profile, setProfile } = useUserProfileContext();
  const [token, setToken] = useLocalStorage("js4ever_token", "");
  const pathname = usePathname();
  const router = useRouter();

  const isAuthLayout = React.useMemo(
    () =>
      pathname?.includes("/login") ||
      pathname?.includes("/register") ||
      pathname?.includes("/oauth-success-redirect"),
    [pathname]
  );
  const bgImage = React.useMemo(
    () => (isAuthLayout ? bgAuth.src : bgMain.src),
    [isAuthLayout]
  );

  async function getProfile() {
    if (isAuthLayout) {
      setProfile(null);
    } else {
      if (token) {
        try {
          const resProfile = (await getUserProfile()) as IResUserProfile;
          setProfile && setProfile(resProfile.data || null);
        } catch (error) {
          router.push("/auth/login");
        }
      } else {
        router.push("/auth/login");
      }
    }
  }

  React.useEffect(() => {
    getProfile();
  }, [pathname]);

  return (
    <div
      className={`min-h-screen pb-[33px] ${styles["layout"]}`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {isAuthLayout && (
        <>
          {/* corner */}
          <div
            className={`fixed left-0 z-[10] w-10 ${styles["corner-vertical"]} ${styles["corner-left"]}`}
          />
          <div
            className={`fixed right-0 z-[10] w-10 ${styles["corner-vertical"]} ${styles["corner-right"]}`}
          />
          <div
            className={`fixed bottom-0 z-[10] h-10 ${styles["corner-horizontal"]}`}
          />

          {/* icon union = plus */}
          <IcUnion
            className={`fixed z-[11] ${styles["ic-union"]} ${styles["ic-left"]}`}
          />
          <IcUnion
            className={`fixed z-[11] ${styles["ic-union"]} ${styles["ic-right"]}`}
          />

          {/* stars */}
          <div
            className={`fixed h-6 w-6 z-[11] ${styles["star-green"]} ${styles["star-left"]}`}
          />
          <div
            className={`fixed h-6 w-6 z-[11] ${styles["star-green"]} ${styles["star-right"]}`}
          />
        </>
      )}

      {children}
    </div>
  );
}
