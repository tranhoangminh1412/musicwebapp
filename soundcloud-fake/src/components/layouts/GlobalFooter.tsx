import * as React from "react";
import { usePathname } from "next/navigation";

import { useLocaleContext } from "@/contexts/LocaleContext";

import { CONTACT, LOCALES } from "@/constants/information.constant";

import styles from "./Layout.module.scss";

export interface IGlobalFooterProps {}

export default function GlobalFooter(props: IGlobalFooterProps) {
  const pathname = usePathname();

  const { locale, setLocale } = useLocaleContext();

  const onChangeLanguage = (value: string) => {
    setLocale(value);
    localStorage.setItem("locale", value);
  };

  return (
    <footer
      className={`fixed bottom-0 left-0 z-[99] w-full text-xs text-dark-a1 flex justify-between items-center bg-[#0e0c15ED] ${
        pathname?.includes("/auth/")
          ? "px-14 pb-3 pt-2"
          : `py-2 px-10 ${styles["footer"]}`
      }`}
    >
      <ul className="flex gap-4 items-center">
        {LOCALES.map((item: any) => (
          <li
            key={item.value}
            className={`cursor-pointer ${
              locale === item.value ? "text-white" : "hover:text-white"
            }`}
            onClick={() => onChangeLanguage(item.value)}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <ul
        className={`flex justify-end items-center gap-4 ${styles["list-social"]}`}
      >
        <li>
          <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
            <IcFacebook color="#a1a1a1" size="16" />
          </a>
        </li>

        <li>
          <a href={`tel:${CONTACT.phone}`}>
            <IcPhone color="#a1a1a1" size="16" />
          </a>
        </li>

        <li>
          <a href={`mailto:${CONTACT.email}`}>
            <IcEmail color="#a1a1a1" size="16" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
