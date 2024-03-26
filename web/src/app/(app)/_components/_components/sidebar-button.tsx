"use client";
import { UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, ReactElement } from "react";
import { IconType } from "react-icons";

interface SidebarButtonProps extends ComponentPropsWithoutRef<"a"> {
  className?: string;
  Icon: ReactElement<IconType>;
  navlink?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function SidebarButton({
  children,
  className,
  Icon,
  navlink,
  onClick,
}: SidebarButtonProps) {
  const pathname = usePathname();
  const route = pathname.slice(1);
  const active = typeof navlink === "string" && navlink === route;

  const extraProps =
    typeof navlink === "string"
      ? {
          component: Link,
          href: "/" + navlink,
        }
      : {
          href: "",
          onClick,
        };

  return (
    <UnstyledButton
      {...extraProps}
      className={clsx(
        "group flex items-center gap-3 rounded-[0.2rem] px-3 py-3 text-2xl text-mantine-gray-6 hover:bg-mantine-gray-1 hover:text-black dark:hover:bg-mantine-dark-5 dark:hover:text-white",
        className,
        active && "!bg-mantine-primary-light !text-mantine-primary-4",
      )}
    >
      {Icon}
      <span
        className={clsx(
          "text-sm font-semibold text-mantine-gray-7 group-hover:text-black dark:text-mantine-gray-6 dark:group-hover:text-white",
          active && "!text-mantine-primary-4",
        )}
      >
        {children}
      </span>
    </UnstyledButton>
  );
}
