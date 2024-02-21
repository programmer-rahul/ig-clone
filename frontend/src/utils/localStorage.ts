export const getUserFromLocal = () => {
  try {
    let localValue = localStorage.getItem("current-user");

    if (localValue !== null) {
      localValue = JSON.parse(localValue);
      return localValue;
    }
    // console.log("Local value :- ", localValue);
  } catch (error) {
    console.log("Error in getting values from localStorage");
  }
  return false;
};

export const storeUserInLocal = (data: {}) => {
  try {
    localStorage.setItem("current-user", JSON.stringify(data));
  } catch (error) {
    console.log("Error in storing user in localStorage");
  }
};
