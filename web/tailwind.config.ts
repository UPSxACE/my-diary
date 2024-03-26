import type { Config } from "tailwindcss";

const mantineColorTokens = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
];

const colors = mantineColorTokens.reduce(
  (accObj: { [key: string]: string }, colorToken) => {
    for (let i = 0; i <= 9; i++) {
      accObj[
        `mantine-${colorToken}-${i}`
      ] = `var(--mantine-color-${colorToken}-${i})`;
    }
    return accObj;
  },
  {}
);

["filled", "filled-hover", "light", "light-hover", "light-color"].map(
  (token) => {
    colors[
      `mantine-primary-${token}`
    ] = `var(--mantine-primary-color-${token})`;
  }
);

for (let i = 0; i <= 9; i++) {
  colors[`mantine-primary-${i}`] = `var(--mantine-primary-color-${i})`;
}

const extra = {
  "mantine-text": "var(--mantine-color-text)",
  "mantine-dimmed": "var(--mantine-color-dimmed)",
};

const config: Config = {
  darkMode: ["selector", ":root[data-mantine-color-scheme='dark']"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ...colors,
        ...extra,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
