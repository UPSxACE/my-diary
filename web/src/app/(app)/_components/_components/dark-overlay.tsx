"use client";

import clsx from "clsx";
import { useContext } from "react";
import useTransitionHelper from "../../../../hooks/use-transition-helper";
import { AppShellContext } from "../app-shell";

export default function DarkOverlay() {
  const { burguerOpen } = useContext(AppShellContext);
  const state = useTransitionHelper(burguerOpen, 200);
  const overlay = state >= 1 || burguerOpen;

  if (overlay) {
    return (
      <div
        className={clsx(
          "absolute left-[300px] top-0 h-svh w-svw bg-black transition-opacity duration-[var(--app-shell-transition-duration)] sm:hidden",
          state === 2 ? "opacity-50" : "opacity-0",
        )}
      />
    );
  }
}
