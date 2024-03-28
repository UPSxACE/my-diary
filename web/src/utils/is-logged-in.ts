import { cookies } from "next/headers";
import "server-only";

export default function isLoggedIn() {
  const cookieStore = cookies();
  const loggedIn =
    cookieStore.has("myDiaryToken") &&
    cookieStore.get("authToken")?.value !== "";

  return loggedIn;
}
