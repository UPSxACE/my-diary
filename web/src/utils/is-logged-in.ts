import { cookies } from "next/headers";
import "server-only";

export default function isLoggedIn() {
  const cookieStore = cookies();
  const loggedIn =
    cookieStore.has("authToken") && cookieStore.get("authToken")?.value !== "";

  return loggedIn;
}
