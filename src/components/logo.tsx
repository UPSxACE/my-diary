import { Anchor } from "@mantine/core";
import clsx from "clsx";
import Link from "next/link";
import { PiNoteFill } from "react-icons/pi";

export default function Logo({ white }: { white?: boolean }) {
  return (
    <div className="flex flex-1 relative h-full overflow-hidden items-center">
      <Anchor
        component={Link}
        href="/"
        className={clsx(
          "flex items-center absolute flex-nowrap text-2xl !no-underline font-medium",
          white ? "text-white" : "!text-mantine-text"
        )}
      >
        <i
          className={clsx(
            "flex text-4xl",
            white ? "text-white" : "text-mantine-primary-4"
          )}
        >
          <PiNoteFill />
        </i>
        MyDiary
      </Anchor>
    </div>
  );
}
