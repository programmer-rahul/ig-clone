import axios, { AxiosError } from "axios";
import { useState } from "react";
import { User } from "../utils/types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

interface Response {
  status: boolean;
  statusCode?: number;
  message: string;
  data: {
    user: User;
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
  const [apiProgress, setApiProgress] = useState<number>(0);
  const [cancelApi] = useState(axios.CancelToken.source());

  const callApi = async ({ url, method, data, cred = false }: CallApi) => {
    setLoading(true);

    try {
      const response = await axiosInstance({
        method,
        url,
        data,
        withCredentials: cred,
        cancelToken: cancelApi.token,
        onUploadProgress(progressEvent) {
          if (progressEvent.total) {
            setApiProgress(
              Math.round((progressEvent.loaded / progressEvent.total) * 100),
            );
          }
        },
      });
      setResponse(response.data);
    } catch (error) {
      console.log(error);
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

  return { loading, response, callApi, apiProgress, cancelApi };
}
