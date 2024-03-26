"use client";
import { Loader } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import Image from "next/image";
import { useRef } from "react";
import NotePreviewSkeleton from "../../../../components/notes/note-preview/skeleton";
import ElementRepeater from "../../../../utils/element-repeater";
import NotePreviews from "./_components/note-previews";
import useInfiniteRequest from "./_hooks/use-infinite-request";

export default function Notes() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection({
    root: loaderRef.current,
    threshold: 0,
  });

  const {
    firstLoad,
    isLoading,
    error,
    data,
    hasNextPage,
    searchFilterDebounced,
    refetch,
  } = useInfiniteRequest({
    intersection,
  });

  const notes = data?.pages?.reduce((acc, currPage) => {
    const safeData = currPage?.data || [];
    acc.push(...safeData);
    return acc;
  }, []);

  if ((isLoading || error) && !firstLoad) {
    return (
      <section
        id="notes"
        className="flex flex-1 flex-col items-center justify-center p-4 px-6 pt-0"
      >
        <Loader />
      </section>
    );
  }

  const zeroNotes = !isLoading && Array.isArray(notes) && notes?.length === 0;

  if (zeroNotes) {
    return (
      <section
        id="notes"
        className="flex flex-1 flex-col items-center justify-center p-4 px-6 pt-0"
      >
        {!searchFilterDebounced ? (
          <>
            <Image
              width={557}
              height={486}
              className="filter-[drop-shadow] white-img-shadow max-h-[40vh] w-full"
              src="/notes-girl.svg"
              alt="Girl writing notes"
            />
            <h1 className="mt-8 text-center text-2xl font-medium text-mantine-text xs:text-3xl dark:text-mantine-gray-6">
              Go ahead, and add your first note!
            </h1>
          </>
        ) : (
          <h1 className="m-0 text-xl font-normal">No results</h1>
        )}
      </section>
    );
  }

  return (
    <section
      id="notes"
      className="grid flex-1 auto-rows-min grid-cols-1 gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {!isLoading && !error ? (
        <NotePreviews notes={notes} refetch={refetch} />
      ) : (
        <ElementRepeater nRepeat={16} element={<NotePreviewSkeleton />} />
      )}
      {hasNextPage && (
        <div
          ref={intersection.ref}
          className="col-span-1 flex justify-center md:col-span-2 lg:col-span-3 xl:col-span-4"
        >
          <Loader />
        </div>
      )}
    </section>
  );
}
