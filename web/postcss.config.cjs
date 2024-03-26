module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "576px",
        "mantine-breakpoint-sm": "768px",
        "mantine-breakpoint-md": "992px",
        "mantine-breakpoint-lg": "1200px",
        "mantine-breakpoint-xl": "1400px",
        "mantine-breakpoint-2xl": "1536px",
      },
    },
  },
};
