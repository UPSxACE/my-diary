"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export default async function logout() {
  cookies().delete({
    name: "myDiaryToken",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });

  redirect("/");
}
