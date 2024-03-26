"use client";
import { AppShell as AppShellMantine } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface IAppShellContext {
  navbarCollapsed: boolean;
  setNavbarCollapsed: Dispatch<SetStateAction<boolean>>;
  burguerOpen: boolean;
  burguerToggle: () => void;
}

const defaultValue: IAppShellContext = {
  navbarCollapsed: false,
  setNavbarCollapsed: (action: SetStateAction<boolean>) => false,
  burguerOpen: false,
  burguerToggle: () => {},
};

export const AppShellContext: Context<IAppShellContext> =
  createContext(defaultValue);

export default function AppShell(props: { children: Readonly<ReactNode> }) {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShellContext.Provider
      value={{
        navbarCollapsed,
        setNavbarCollapsed,
        burguerOpen: opened,
        burguerToggle: toggle,
      }}
    >
      <AppShellMantine
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "xs",
          collapsed: { mobile: !opened, desktop: true },
        }}
        padding={0}
      >
        {props.children}
      </AppShellMantine>
    </AppShellContext.Provider>
  );
}
