"use client";

import { MantineColorsTuple, createTheme } from "@mantine/core";

const mainColor: MantineColorsTuple = [
  "#ffe9e9",
  "#ffd1d1",
  "#fba0a1",
  "#f76d6d",
  "#f34141",
  "#f22625",
  "#f21616",
  "#d8070b",
  "#c10008",
  "#a90003",
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: "mainColor",
  primaryShade: 4,
  colors: {
    mainColor,
  },
});
