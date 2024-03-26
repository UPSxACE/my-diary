"use client";

import { TextInput } from "@mantine/core";
import { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import { NotesContext } from "../../_context/notes-context";

export default function SearchInput() {
  const { searchFilter, setSearchFilter } = useContext(NotesContext);

  return (
    <TextInput
      value={searchFilter}
      onChange={(e) => setSearchFilter(e.target.value)}
      placeholder="Search"
      radius="xs"
      className="max-md:flex-1 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
      leftSection={<RiSearchLine />}
    />
  );
}
