"use client";
import { useContext } from "react";
import Api from ".";
import { ApiContext } from "./context";

export default function useApi(): Api {
  const { api } = useContext(ApiContext);

  if (api === null) {
    throw new Error("Api context is null");
  }

  return api;
}
