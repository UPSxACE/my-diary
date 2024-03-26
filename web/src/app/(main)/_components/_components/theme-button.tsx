"use client";
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="2.25rem"
      aria-label="Toggle color scheme"
      classNames={{ icon: "justify-center flex flex-col" }}
    >
      {computedColorScheme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
    </ActionIcon>
  );
}
