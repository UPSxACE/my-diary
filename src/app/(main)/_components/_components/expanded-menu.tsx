"use client";
import { NavLink, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ExpandedMenu() {
  const pathname = usePathname();
  const route = pathname.slice(1).split("/")[0];
  const theme = useMantineTheme();

  return null;

  return (
    <div className="hidden xs:flex h-full mr-auto flex-nowrap">
      <NavLink
        component={Link}
        href="/"
        label="Home"
        classNames={{
          root: "bg-transparent text-mantine-text dark:text-mantine-text h-full border-b border-b-2 border-solid whitespace-nowrap px-0 mx-3 transition-all duration-500",
          label: route === "" ? "" : "font-normal",
        }}
        variant="subtle"
        styles={{
          root: {
            borderBottomColor:
              route === "" ? theme.colors.mainColor[4] : "transparent",
          },
        }}
      />
      <NavLink
        component={Link}
        href="/learn-more"
        label="Learn More"
        classNames={{
          root: "bg-transparent text-mantine-text dark:text-mantine-text h-full border-b border-b-2 border-solid whitespace-nowrap px-0 mx-3 transition-all duration-500",
          label: route === "learn-more" ? "" : "font-normal",
        }}
        variant="subtle"
        styles={{
          root: {
            borderBottomColor:
              route === "learn-more"
                ? theme.colors.mainColor[4]
                : "transparent",
          },
        }}
      />
    </div>
  );
}
