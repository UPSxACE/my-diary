import { cookies } from "next/headers";
import jwtVerify from "../utils/jwt-verify";
import { redirect } from "next/navigation";

export default async function getToken(): Promise<string | null> {
  const token = cookies().get("authToken")?.value;

  if (!token) {
    redirect("/");
  }

  const jwtVerification = jwtVerify(token);
  if (!jwtVerification?.valid) {
    return null;
  }

  return token;
}
