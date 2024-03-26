"use client";
import {
  Loader,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import useApi from "../../../../../../api/hook";
import revalidateNoteCache from "../../../../../../actions/revalidate-note-cache";

export default function PageOptionsHeader({ noteId }: { noteId: number }) {
  const [opened, { open, close }] = useDisclosure(false);

  const api = useApi();
  const router = useRouter();

  function deleteNote() {
    open();
    api
      .deleteNoteById(noteId)
      .then(async () => {
        await revalidateNoteCache(noteId)
        router.push("/app");
      })
      .catch(() => {
        // TODO: handle error
      });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        classNames={{
          content: "shadow-none bg-transparent",
          inner: "w-full",
          body: "flex justify-center",
        }}
      >
        {/* Modal content */}
        <Loader color="white" />
      </Modal>
      <Menu position="bottom-end" offset={2}>
        <MenuTarget>
          <UnstyledButton className="ml-auto flex h-full flex-col justify-center text-xl">
            <SlOptions />
          </UnstyledButton>
        </MenuTarget>
        <MenuDropdown className="p-1">
          <MenuItem
            component={Link}
            leftSection={<FaPencilAlt />}
            className="py-1"
            href={"/app/note/" + noteId + "/edit"}
          >
            Edit
          </MenuItem>
          <MenuItem
            leftSection={<FaTrash />}
            className="py-1"
            onClick={deleteNote}
          >
            Delete
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </>
  );
}
