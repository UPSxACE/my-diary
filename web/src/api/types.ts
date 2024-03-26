export interface LoginBody {
  username: string;
  password: string;
}

export interface RegisterBody {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface NewNoteBody {
  title: string;
  content: string;
  content_raw: string;
}

export interface GetNotesParams {
  search?: string;
  order: "latest" | "oldest" | "az" | "za";
  cursor?: string;
}
