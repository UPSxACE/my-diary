"use client";
import axios, { AxiosInstance } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GetNotesParams, LoginBody, NewNoteBody, RegisterBody } from "./types";
import { AXIOS_CONFIG } from "./client";

export default class Api {
  axios: AxiosInstance;
  router: AppRouterInstance;

  constructor(router: AppRouterInstance) {
    const axiosInstance = axios.create(AXIOS_CONFIG);

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          return this.router.push("/");
        }
        if (error?.response?.status === 403) {
          return this.router.push("/login");
        }
        return Promise.reject(error);
      },
    );

    this.axios = axiosInstance;
    this.router = router;
  }

  async _get(route: string, params?: Record<string, any>) {
    const config = params ? { params } : undefined;
    return this.axios.get(route, config).then((res) => res.data);
  }

  async _post(route: string, body: { [key: string]: any }) {
    return this.axios.post(route, body).then((res) => res.data);
  }

  async _put(route: string, body: { [key: string]: any }) {
    return this.axios.put(route, body).then((res) => res.data);
  }

  async _delete(route: string, params?: Record<string, any>) {
    const config = params ? { params } : undefined;
    return this.axios.delete(route, config).then((res) => res.data);
  }

  async getProfile() {
    return this._get("/profile");
  }

  async getNoteById(id: number) {
    return this._get("/notes/" + id);
  }

  async putNoteById(id: number, noteBody: NewNoteBody) {
    return this._put("/notes/" + id, noteBody);
  }

  async deleteNoteById(id: number) {
    return this._delete("/notes/" + id);
  }

  async getNotes(params: GetNotesParams) {
    const { search, order, cursor } = params;
    return this._get("/notes", { search, order, cursor });
  }

  async postLogin(loginBody: LoginBody) {
    return this._post("/login", loginBody);
  }

  async postRegister(registerBody: RegisterBody) {
    return this._post("/register", registerBody);
  }

  async postNotes(noteBody: NewNoteBody) {
    return this._post("/notes", noteBody);
  }
}
