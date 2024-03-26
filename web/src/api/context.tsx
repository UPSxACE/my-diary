"use client";
import { useRouter } from "next/navigation";
import { Context, ReactNode, createContext } from "react";
import Api from ".";

interface IApiContext {
  api: Api | null;
}

const defaultValue: IApiContext = {
  api: null,
};

export const ApiContext: Context<IApiContext> = createContext(defaultValue);

export default function ApiProvider(props: { children: Readonly<ReactNode> }) {
  const router = useRouter();
  const api = new Api(router);

  return (
    <ApiContext.Provider value={{ api }}>{props.children}</ApiContext.Provider>
  );
}
