import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface PageContainerProps extends ComponentPropsWithoutRef<"div"> {
  wrapperClassname?: string;
  secondary?: boolean;
}

export default function PageContainer(props: PageContainerProps) {
  const classesPrimary =
    "flex flex-1 flex-col items-center bg-white dark:bg-mantine-dark-7";
  const classesSecondary =
    "flex flex-1 flex-col items-center bg-mantine-gray-0 dark:bg-mantine-dark-6";
  return (
    <div
      className={clsx(
        props.secondary ? classesSecondary : classesPrimary,
        props.wrapperClassname
      )}
    >
      <div
        className={clsx(
          "flex flex-col flex-1 max-w-screen-lg w-full",
          props.className
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
