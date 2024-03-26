"use server";
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  cookies().delete("authToken");

  redirect("/");
}
