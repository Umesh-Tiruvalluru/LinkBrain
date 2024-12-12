import axios from "axios";

const BACKEND_URL = "https://linkbrain.onrender.com/";

export async function register(email: string, password: string) {
  const response = await axios.post(`${BACKEND_URL}/register`, {
    usernname: email,
    password: password,
  });

  return response;
}

export async function login(email: string, password: string) {
  const response = await axios.post(`${BACKEND_URL}/login`, {
    usernmae: email,
    password: password,
  });

  window.localStorage.setItem("jwt", response.data.token);

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
    { headers: { Authorization: window.localStorage.getItem("jwt") } }
  );

  return response.data.hash;
}

export async function isLinkExist() {
  const response = await axios.get(`${BACKEND_URL}/brain/share`, {
    headers: { Authorization: window.localStorage.getItem("jwt") },
  });

  return response.data.res;
}

export async function getShareData(shareId: string | undefined) {
  const response = await axios.get(`${BACKEND_URL}/brain/${shareId}`);

  return response;
}
