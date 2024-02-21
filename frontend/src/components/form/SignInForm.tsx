import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import useAuth from "../../hooks/useAuth.ts";
import { storeUserInLocal } from "../../utils/localStorage.ts";

export type FormValues = {
  username: string;
  password: string;
  confPassword?: string;
};

const SignInForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const { callApi, response, loading } = useAxios();
  const { setIsAuth } = useAuth();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        formValues.username?.trim().length > 0 &&
        formValues.password?.trim().length >= 6
      )
    )
      return;

    console.log("clicked");
    callApi({ method: "post", url: "/user/signin", data: formValues });
  };

  useEffect(() => {
    if (response) {
      console.log("Response recieved :- ", response);
      if (response.status) {
        if (response.data) {
          setIsAuth(true);
          storeUserInLocal(response.data);
        }
      } else {
        setApiError(response.message);
      }
    }
  }, [response]);

  return (
    <form
      className="form w-full flex flex-col gap-2 lg:gap-4"
      onSubmit={submitHandler}
    >
      <FormInput
        placeholder="Phone number,username or email address"
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
      <FormBtn text="Log in" values={formValues} />
      <div className="line my-2 relative w-full flex flex-col justify-center items-center">
        <span className="absolute bg-white px-4 font-semibold lg:text-xl">
          OR
        </span>
        <hr className="border-zinc-300 w-full" />
      </div>
      <div className="errors text-center text-red-600 text-sm">
        {apiError && <p>{apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="text-center mx-auto font-bold loading-spinner"></p>
        )}
      </div>
      <Link
        className="text-xs text-center mt-2 lg:text-sm"
        to={"/forgot-password"}
      >
        Forgotten your password?
      </Link>
    </form>
  );
};
export default SignInForm;
