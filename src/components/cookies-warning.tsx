"use client";

import { Button, Dialog } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function CookiesWarning() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    setTimeout(() => {
      const cookieAccepted = localStorage.getItem("cookiesAccepted");
      if (cookieAccepted !== "true") {
        open();
      }
    }, 500);
  }, [open]);

  function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    close();
  }

  return (
    <Dialog
      opened={opened}
      onClose={close}
      size="md"
      radius="md"
      className="!p-6 shadow-xl"
      transitionProps={{
        duration: 1000,
      }}
    >
      <h1 className="m-0">We use cookies</h1>
      <p className="m-0 mb-4 mt-1">
        Cookies help us deliver the best experience on our app. By using our
        app, you agree to the use of{" "}
        <strong className="underline">essential</strong> cookies to maintain a
        smooth experience and analyze our website traffic.{" "}
        <Link href="/privacy-policy" target="_blank">
          Find out how we use cookies.
        </Link>
      </p>
      <Button className="w-full" onClick={acceptCookies}>
        Accept
      </Button>
    </Dialog>
  );
}
