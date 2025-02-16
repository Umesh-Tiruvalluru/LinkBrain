import axios from "axios";
import { DataProps } from "./types";
const BACKEND_URL = "https://linkbrain-api.onrender.com/api/v1";

export async function register(email: string, password: string) {
  const response = await axios.post(`${BACKEND_URL}/register`, {
    email: email,
    password: password,
  });

  return response;
}

export async function onDelete(id: string) {
  const response = await axios.delete(`${BACKEND_URL}/content/${id}`, {
    headers: { Authorization: window.localStorage.getItem("jwt") },
  });
  return response;
}

export async function login(email: string, password: string) {
  const response = await axios.post(`${BACKEND_URL}/login`, {
    email: email,
    password: password,
  });

  window.localStorage.setItem("jwt", response.data.token);
  return response;
}

export async function createContent({
  title,
  type,
  chips: tags,
  description,
  link,
}: DataProps) {
  const response = await axios.post(
    `${BACKEND_URL}/content`,
    { title, type, tags, description, link },
    {
      headers: { Authorization: localStorage.getItem("jwt") },
    },
  );

  return response;
}

export async function getData() {
  const response = await axios.get(`${BACKEND_URL}/content`, {
    headers: { Authorization: window.localStorage.getItem("jwt") },
  });

  return response.data.content;
}

export async function share(share: boolean) {
  const response = await axios.post(
    `${BACKEND_URL}/brain/share`,
    {
      share: share,
    },
    { headers: { Authorization: window.localStorage.getItem("jwt") } },
  );

  return response.data.hash;
}

export async function isLinkExist() {
  const response = await axios.get(`${BACKEND_URL}/brain/share`, {
    headers: { Authorization: window.localStorage.getItem("jwt") },
  });

  return response.data.res;
}

export async function getShareData(shareId: string) {
  const response = await axios.get(`${BACKEND_URL}/brain/${shareId}`);
  return response;
}
