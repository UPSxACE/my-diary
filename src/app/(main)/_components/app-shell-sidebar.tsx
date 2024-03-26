"use client";

import { AppShellNavbar, Button } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";
import logout from "../../../actions/logout";
import useTransitionHelper from "../../../hooks/use-transition-helper";
import { AppShellContext } from "./app-shell";

export default function AppShellSidebar({ loggedIn }: { loggedIn: boolean }) {
  const { burguerOpen, burguerToggle } = useContext(AppShellContext);
  const state = useTransitionHelper(burguerOpen, 200);
  const overlay = state >= 1 || burguerOpen;

  async function onClick() {
    await logout();
    burguerToggle();
  }

  return (
    <AppShellNavbar
      w={300}
      className="border-mantine-gray-3 dark:border-mantine-dark-4 mt-[1px] border-0 border-e"
    >
      {overlay && (
        <div
          className={clsx(
            "xs:hidden absolute left-[300px] top-0 h-svh w-svw bg-black transition-opacity duration-[var(--app-shell-transition-duration)]",
            state === 2 ? "opacity-50" : "opacity-0",
          )}
        />
      )}

      {loggedIn ? (
        <>
          <Button
            component={Link}
            href="/app"
            variant="default"
            className="h-14 rounded-none border-0 text-base"
            classNames={{ inner: "justify-start" }}
            onClick={onClick}
            size="lg"
          >
            My Notes
          </Button>
          <Button
            variant="default"
            className="h-14 rounded-none border-0 text-base"
            classNames={{ inner: "justify-start" }}
            onClick={onClick}
            size="lg"
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            component={Link}
            href="/login"
            variant="default"
            className="h-14 rounded-none border-0 text-base"
            classNames={{ inner: "justify-start" }}
            onClick={burguerToggle}
            size="lg"
          >
            Login
          </Button>
          <Button
            component={Link}
            href="/register"
            variant="default"
            className="h-14 rounded-none border-0 text-base"
            classNames={{ inner: "justify-start" }}
            onClick={burguerToggle}
            size="lg"
          >
            Register
          </Button>
        </>
      )}
    </AppShellNavbar>
  );
}
