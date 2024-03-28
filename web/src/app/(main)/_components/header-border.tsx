"use client";
import { useWindowScroll } from "@mantine/hooks";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AppShellContext } from "./app-shell";

export default function HeaderBorder() {
  const [scroll] = useWindowScroll();
  const { burguerOpen } = useContext(AppShellContext);
  const pathname = usePathname();
  const route = pathname.slice(1).split("/")[0];

  const show =
    scroll.y > 0 || burguerOpen || (route !== "" && route !== "privacy-policy");

  const defaultClasses =
    "m-0 fixed top-[var(--app-shell-header-height)] w-screen border-0 h-[1px] bg-transparent transition-bg duration-[300ms]";
  return (
    <hr
      className={clsx(
        defaultClasses,
        show && "!bg-mantine-gray-3 dark:!bg-mantine-dark-4",
      )}
    />
  );
}
