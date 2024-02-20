import { jwtDecode } from "jwt-decode";

export const isAccessTokenValid = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    console.log("Access token not found in localStorage");
  }

  const tokenValid = jwtDecode(accessToken);
  if (!tokenValid) {
    console.log("InValid Access token from localStorage");
  }

  // token expire date
  const tokenExp = new Date(tokenValid.exp * 1000);

  if (tokenExp < new Date()) {
    console.log("Access Token has been expired");
    return false;
  } else return true;
};
