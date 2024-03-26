import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface AppPageContainerProps extends ComponentPropsWithoutRef<"div"> {
  wrapperClassname?: string;
  secondary?: boolean;
}

export default function AppPageContainer(props: AppPageContainerProps) {
  const classesPrimary =
    "flex flex-1 flex-col items-center bg-white dark:bg-mantine-dark-7";
  const classesSecondary =
    "flex flex-1 flex-col items-center bg-mantine-gray-0 dark:bg-mantine-dark-7";
  return (
    <div
      className={clsx(
        props.secondary ? classesSecondary : classesPrimary,
        props.wrapperClassname,
      )}
    >
      <div className={clsx("flex w-full flex-1 flex-col", props.className)}>
        {props.children}
      </div>
    </div>
  );
}
