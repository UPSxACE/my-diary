"use client";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderReactQuery,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function QueryClientProvider(props: {
  children: Readonly<ReactNode>;
}) {
  return (
    <QueryClientProviderReactQuery client={queryClient}>
      {props.children}
    </QueryClientProviderReactQuery>
  );
}
