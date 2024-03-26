"use client";
import { Button, Modal } from "@mantine/core";
import { FaPersonDigging } from "react-icons/fa6";

interface WipModalProps {
  opened: boolean;
  close: () => void;
}

export default function WipModal({ opened, close }: WipModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title="🚧 Work in Progress! 🚧"
      size="lg"
      classNames={{
        title: "font-semibold",
      }}
    >
      <div className="flex justify-center">
        <FaPersonDigging size={100} className="my-4" />
      </div>
      <p>Welcome to our early version (v1.0.0-alpha) of the app! 🎉</p>
      <p>This feature is not ready for use yet.</p>
      <p>
        Please note that this version is still in its infancy, and many features
        are yet to be implemented. While most necessary functions are usable, we
        want to inform you that all data will be cleared once the final version
        is released.
      </p>
      <p>
        Consider this as a demo for now, as we&apos;re continuously working to
        enhance your experience. Expect frequent updates and improvements! 🛠️
      </p>

      <div className="flex">
        <Button className="ml-auto" onClick={close}>
          OK
        </Button>
      </div>
    </Modal>
  );
}
