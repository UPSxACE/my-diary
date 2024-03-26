import { UnstyledButton } from "@mantine/core";
import { HiMiniArrowLeft } from "react-icons/hi2";

import Link from "next/link";
import ssrNote from "../../../../../actions/ssr-note";
import AppPageContainer from "../../../../../components/page-containers/app-page-container";
import Article from "./_components/article";
import PageOptionsHeader from "./_components/page-options-header";

export default async function NoteIdPage({
  params,
}: {
  params: { id: number };
}) {
  const noteData = await ssrNote(params.id);

  return (
    <>
      <header className="flex select-none items-center gap-3 bg-white p-2 px-4 text-xl font-medium text-mantine-text dark:bg-mantine-dark-7">
        <div className="flex gap-3">
          <UnstyledButton
            component={Link}
            href="/app"
            className="mt-[0.175rem] flex h-full flex-col justify-center  text-2xl"
          >
            <HiMiniArrowLeft />
          </UnstyledButton>
        </div>
        {/* <span>{noteData.title}</span> */}
        {/* <Button variant="default" className="ml-auto border-0">
          Share
        </Button> */}{" "}
        <PageOptionsHeader noteId={noteData.note.id} />
      </header>
      <AppPageContainer className="max-w-[850px] p-4 xs:p-10 xs:px-16 sm:py-16 md:px-16">
        <Article data={noteData} />
      </AppPageContainer>
    </>
  );
}
