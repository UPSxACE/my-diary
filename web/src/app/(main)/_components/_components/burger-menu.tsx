"use client";
import { Button, Text } from "@mantine/core";
import { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AppShellContext } from "../app-shell";

export default function BurgerMenu() {
  const { burguerToggle } = useContext(AppShellContext);
  return (
    <Button
      className="block xs:!hidden !text-mantine-text ml-auto p-2 h-12"
      variant="transparent"
      onClick={burguerToggle}
    >
      <Text display="flex" component="i" style={{ fontSize: "2rem" }}>
        <RxHamburgerMenu />
      </Text>
    </Button>
  );
}
