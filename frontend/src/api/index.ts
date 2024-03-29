import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { LocalStorage } from "../utils";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  timeout: 100000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = LocalStorage.get("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// user
export const signinUser = (data: { username: string; password: string }) => {
  return axiosClient.post("/user/signin", data);
};

export const signupUser = (data: {
  email: string;
  username: string;
  fullname: string;
  password: string;
}) => {
  return axiosClient.post("/user/signup", data);
};

// user
export const verifyOtp = (data: { otp: string; singupdata: {} }) => {
  return axiosClient.post("/user/verify-otp", { ...data });
};

export const updateAvatar = (data: FormData) => {
  return axiosClient.put("/user/update-avatar", data);
};

export const findUser = (username: string) => {
  return axiosClient.get("/user/find-user/" + username);
};

export const refreshAccessToken = (token: string) => {
  return axiosClient.put("/user/refresh-access-token", token);
};

// post
export const uploadPost = (
  data: FormData,
  uploadProgress: (progressEvent: AxiosProgressEvent) => void,
  cancelApi: CancelTokenSource,
) => {
  return axiosClient.post("/post/new-post", data, {
    onUploadProgress: uploadProgress,
    cancelToken: cancelApi.token,
  });
};
export const fetchAllPosts = () => {
  return axiosClient.get("/post/all-posts");
};

// like
export const likePost = (postId: string) => {
  return axiosClient.post("/like/add-post-like/" + postId);
};
export const disLikePost = (postId: string) => {
  return axiosClient.delete("/like/remove-post-like/" + postId);
};

// follow
export const addNewFollow = (userId: string) => {
  return axiosClient.post("/follow/add-follower/" + userId);
};
export const removeFollow = (userId: string) => {
  return axiosClient.delete("/follow/remove-follower/" + userId);
};

// message
export const addNewMessage = (data: {
  content: string;
  receiverId: string;
}) => {
  return axiosClient.post("/message/new-message", data);
};
export const getAllMessages = (receiverId: string) => {
  return axiosClient.get("/message/get-messages/" + receiverId);
};
export const getAllChatUsers = () => {
  return axiosClient.get("/message/get-all-chat-users");
};
