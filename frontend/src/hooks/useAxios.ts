import axios, { AxiosError } from "axios";
import { useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

interface User {
  _id?: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
}

interface Response {
  status: boolean;
  statusCode?: number;
  message: string;
  data: {
    user?: User;
  } | null;
}

interface CallApi {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: {};
  cred?: boolean;
}

export default function useAxios() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Response | null>(null);

  const callApi = async ({ url, method, data, cred = false }: CallApi) => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        withCredentials: cred,
      });
      setResponse(response.data);
    } catch (error) {
      // define perfect type for error
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        setResponse({
          data: null,
          status: false,
          message: axiosError.response
            ? axiosError.response.data?.message
            : axiosError.message,
        });
      } else {
        setResponse({
          data: null,
          status: false,
          message: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, callApi };
}
