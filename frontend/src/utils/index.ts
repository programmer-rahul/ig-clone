import { AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/api";

export const apiHandler = async (
  api: () => Promise<AxiosResponse<ApiResponse, any>>,
  setLoading: ((loading: boolean) => void) | null,
  onSuccess: (data: ApiResponse) => void,
  onError: (error: string) => void,
) => {
  setLoading && setLoading(true);

  try {
    const response = await api();
    const { data } = response;

    if (data?.success) {
      onSuccess(data);
    }
  } catch (error: any) {
    if (error.code === "ERR_CANCELED") {
      return onError(error.message);
    }
    if ([401, 403].includes(error?.response?.data?.statusCode)) {
      localStorage.clear();
      window.location.href = "/login";
    }
    onError(error?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading && setLoading(false);
  }
};

export class LocalStorage {
  static get(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
