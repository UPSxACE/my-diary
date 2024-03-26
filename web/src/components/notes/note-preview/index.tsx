"use client";

import {
  Anchor,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Paper,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import revalidateNoteCache from "../../../actions/revalidate-note-cache";
import useApi from "../../../api/hook";
import { toDateDMYString } from "../../../utils/date";

interface NotePreviewProps {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  refetch: () => void;
}

export default function NotePreview(props: NotePreviewProps) {
  const api = useApi();

  const { id, title, content, createdAt, refetch } = props;

  const dmyDate = toDateDMYString(createdAt);

  function deleteNote() {
    revalidateNoteCache(id);
    api.deleteNoteById(id).then(() => refetch());
  }

  return (
    <Paper
      component="article"
      withBorder
      radius="xs"
      className="transition-all duration-300 hover:shadow-[0_0_11px_rgba(33,33,33,.2)] dark:bg-mantine-dark-6"
    >
      <div className="flex items-center p-4 pb-0 text-gray-400">
        <span className="text-sm">{dmyDate}</span>
        <Menu position="bottom-end" offset={2}>
          <MenuTarget>
            <UnstyledButton className="ml-auto flex h-full flex-col justify-center p-1 text-lg">
              <SlOptions />
            </UnstyledButton>
          </MenuTarget>
          <MenuDropdown className="p-1">
            <MenuItem
              component={Link}
              leftSection={<FaPencilAlt />}
              className="py-1"
              href={"/app/note/" + id + "/edit"}
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
      </div>
      <Anchor
        className="block p-4 pt-0"
        component={Link}
        underline={"never"}
        href={`/app/note/${id}`}
      >
        <h1 className="m-0 mb-1 text-xl text-mantine-text dark:text-white">
          {title}
        </h1>
        <p className="m-0 line-clamp-[5] h-[7.5rem] whitespace-break-spaces text-base font-medium text-gray-600 dark:text-gray-400">
          {content.replaceAll("\n\n", "\n")}
        </p>
      </Anchor>
    </Paper>
  );
}
