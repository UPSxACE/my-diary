"use server";
import { revalidatePath } from "next/cache";

export default async function revalidateNoteCache(id: number) {
  revalidatePath("/app/note/" + id);
}
