"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WipModal from "../../../../components/wip-modal";

export default function ForgotPasswordWip() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <WipModal opened={opened} close={close} />
      {/* <Anchor
        component={Link}
        // TODO: Forgot password implementation
        href="/forgot-password"
        className="text-xs text-mantine-dimmed"
      >
        Forgot your password?
      </Anchor> */}
      <Button
        variant="transparent"
        className="p-0 text-xs font-normal !text-mantine-dimmed hover:underline"
        onClick={open}
      >
        Forgot your password?
      </Button>
    </>
  );
}
