import { FormValues } from "../components/form/SignUpForm";

export type Errors = {
  email?: string;
  fullname?: string;
  username?: string;
  password?: string;
  apiError?: string;
};

type FormValidations = {
  formValues: FormValues;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  runSetterFunc?: boolean;
};

export const formValidation = ({
  formValues,
  setErrors,
  runSetterFunc = true,
}: FormValidations) => {
  const { username, password, email, fullname } = formValues;
  let errors: Errors = {};

  if (username?.trim() === "") {
    errors.username = "Username is Required";
  }
  if (password?.length < 6) {
    errors.password = "Password should be 6 character long";
  }
  if (password?.trim() === "") {
    errors.password = "Password is Required";
  }
  if (!email.includes("@") || !email.includes(".com")) {
    errors.email = "Email is not valid";
  }
  if (fullname?.trim() === "") {
    errors.fullname = "Full name is required";
  }

  // console.log("errors :- ", errors);
  runSetterFunc && setErrors(errors);

  return Object.keys(errors).length === 0 ? true : false;
};
