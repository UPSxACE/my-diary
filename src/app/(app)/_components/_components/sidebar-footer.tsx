"use client";
import { RiLogoutBoxLine, RiMoonLine, RiSunLine } from "react-icons/ri";

import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useContext } from "react";
import logout from "../../../../actions/logout";
import { AppShellContext } from "../app-shell";
import SidebarButton from "./sidebar-button";

export default function SidebarFooter() {
  const { burguerToggle } = useContext(AppShellContext);
  async function handleLogout() {
    await logout();
    burguerToggle();
  }

  async function handleTheme() {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  }

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div className="border-mantine-gray-3 dark:border-mantine-dark-4 mt-4 flex flex-col border-0 border-t border-solid pt-4">
      <SidebarButton
        onClick={handleTheme}
        Icon={<RiMoonLine />}
        className="dark:hidden"
      >
        Dark Mode
      </SidebarButton>
      <SidebarButton
        onClick={handleTheme}
        Icon={<RiSunLine />}
        className="hidden dark:flex"
      >
        Light Mode
      </SidebarButton>
      <SidebarButton onClick={handleLogout} Icon={<RiLogoutBoxLine />}>
        Log Out
      </SidebarButton>
    </div>
  );
}
