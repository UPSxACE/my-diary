import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwtVerify from "../utils/jwt-verify";

export default async function getToken(): Promise<string | null> {
  const token = cookies().get("myDiaryToken")?.value;

  if (!token) {
    redirect("/");
  }

  const jwtVerification = jwtVerify(token);
  if (!jwtVerification?.valid) {
    return null;
  }

  return token;
}
