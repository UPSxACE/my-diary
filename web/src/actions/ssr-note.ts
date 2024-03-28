import axios from "axios";
import { notFound } from "next/navigation";
import { AXIOS_CONFIG } from "../api/server";
import getToken from "./get-token";

export default async function ssrNote(id: number) {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const axiosInstance = axios.create(AXIOS_CONFIG);

  const { data } = await axiosInstance
    .get("/notes/" + id, {
      params: {
        myDiaryToken: token,
      },
    })
    .catch((err) => {
      return notFound();
    });

  return data;
}
