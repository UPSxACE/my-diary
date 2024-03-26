"use client";
import { useDebouncedState, useIntersection } from "@mantine/hooks";
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useApi from "../../../../../api/hook";
import { GetNotesParams } from "../../../../../api/types";
import { NotesContext, OrderByOption } from "../../../_context/notes-context";

const orderByDictionary: Record<OrderByOption, GetNotesParams["order"]> = {
  "Latest First": "latest",
  "Oldest First": "oldest",
  "Title A-Z": "az",
  "Title Z-A": "za",
};

export default function useInfiniteRequest({
  intersection,
}: {
  intersection: ReturnType<typeof useIntersection>;
}) {
  const [firstLoad, setFirstLoad] = useState(true);

  const { entry } = intersection;

  const { orderBy, searchFilter } = useContext(NotesContext);

  const [searchFilterDebounced, setSearchFilterDebounced] = useDebouncedState(
    searchFilter,
    800,
  );

  useEffect(() => {
    setSearchFilterDebounced(searchFilter);
  }, [searchFilter, setSearchFilterDebounced]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchFilterDebounced]);

  const api = useApi();

  async function fetchNotes({
    pageParam = "",
  }: QueryFunctionContext<QueryKey, string>) {
    const res = await api.getNotes({
      order: orderByDictionary[orderBy],
      cursor: pageParam,
      search: searchFilterDebounced,
    });
    return res;
  }

  const {
    isSuccess,
    isLoading,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["notes", orderBy, searchFilterDebounced],
    queryFn: fetchNotes,
    initialPageParam: "",
    getNextPageParam: (lastPage, pages) => {
      const nextCursor = lastPage?.pagination?.cursor;
      if (nextCursor === "") {
        return null;
      }
      return lastPage?.pagination?.cursor;
    },
  });

  useEffect(() => {
    if (isSuccess && firstLoad) {
      setFirstLoad(false);
    }
  }, [isSuccess, firstLoad]);

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [hasNextPage, entry?.isIntersecting, fetchNextPage]);

  return {
    isLoading,
    error,
    data,
    hasNextPage,
    searchFilterDebounced,
    firstLoad,
    refetch,
  };
}
