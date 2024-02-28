import { FormValues } from "../components/form/SignInForm";

// get user from localStorage
export const getUserFromLocal = () => {
  try {
    let isLocalUser = localStorage.getItem("current-user");
    if (isLocalUser !== null) {
      const currentUser = JSON.parse(isLocalUser);
      // console.log("Local value :- ", currentUser);
      return currentUser;
    }
  } catch (error) {
    console.log("Error in getting values from localStorage");
  }
  return false;
};

// store user in localStorage
export const storeUserInLocal = (data: {}) => {
  try {
    localStorage.setItem("current-user", JSON.stringify(data));
  } catch (error) {
    console.log("Error in storing user in localStorage");
  }
};

export const removeUserFromLocal = () => {
  try{
    localStorage.removeItem('current-user');
  }
  catch(err){
    console.log('error in removing user from localStorage');
  }
}

type SignUpData = {
  username: string;
  fullname: string;
  password: string;
  email: string;
};

// store signupdata in localStorage
export const setSignupDataInLocal = (formValues: FormValues) => {
  try {
    localStorage.setItem("signupdata", JSON.stringify(formValues));
    return true;
  } catch (error) {
    console.log("Error in setting values in localStorage");
  }
};

// get signupdata from localStorage
export const getSignupDataFromLocal = () => {
  let localValues = localStorage.getItem("signupdata");
  if (!localValues) return;
  const signupdata: SignUpData = JSON.parse(localValues);
  return signupdata;
};
