import { apiHandler } from ".";
import { refreshAccessToken } from "./../api/index";

const getNewAccessToken = async (
  token: string,
  loading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  console.log(token);
  apiHandler(
    () => refreshAccessToken(token),
    loading,
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log(err);
    },
  );
};

export { getNewAccessToken };
