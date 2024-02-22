import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import { setSignupDataInLocal } from "../../utils/localStorage.ts";
import { Errors, formValidation } from "../../utils/validations.ts";
import { useNavigate } from "react-router-dom";

export type FormValues = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const { callApi, response, loading } = useAxios();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formValidation({ formValues, setErrors }) &&
      callApi({ method: "post", url: "/user/signup", data: formValues });
  };

  useEffect(() => {
    if (response) {
      console.log("Response recieved :- ", response);
      if (response.status) {
        setSignupDataInLocal(formValues) && navigate("/verify");
      } else {
        // TODO : Error handling
      }
    }
  }, [response]);

  return (
    <form
      className="form w-full flex flex-col gap-2 lg:gap-4"
      onSubmit={submitHandler}
    >
      <FormInput
        placeholder="Mobile number or email address"
        value={formValues.email}
        loading={loading}
        onChange={(e) => {
          setFormValues((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
      />
      <FormInput
        placeholder="Fullname"
        value={formValues.fullname}
        loading={loading}
        onChange={(e) => {
          setFormValues((prev) => {
            return { ...prev, fullname: e.target.value };
          });
        }}
      />
      <FormInput
        type="text"
        placeholder="Username"
        value={formValues.username}
        loading={loading}
        onChange={(e) => {
          setFormValues((prev) => {
            return { ...prev, username: e.target.value };
          });
        }}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={formValues.password}
        loading={loading}
        onChange={(e) => {
          setFormValues((prev) => {
            return { ...prev, password: e.target.value };
          });
        }}
      />
      <FormBtn
        text="Sign Up"
        btnValidation={
          formValidation({
            formValues,
            setErrors,
            runSetterFunc: false,
          })
            ? true
            : false
        }
      />
      <div className="errors text-center text-red-600 text-sm">
        {errors && <p>{errors.apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="text-center mx-auto font-bold loading-spinner"></p>
        )}
      </div>
    </form>
  );
};
export default SignUpForm;
