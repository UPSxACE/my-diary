"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import WipModal from "../../../components/wip-modal";

export default function LearnMoreWip() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <WipModal opened={opened} close={close} />
      <Button
        // TODO href="/#learn-more"
        // TODO component={Link}
        size="md"
        className="text-md sm:h-12 sm:px-6 md:h-12 md:px-7 md:text-lg"
        variant="default"
        onClick={open}
      >
        Learn More
      </Button>
    </>
  );
}
