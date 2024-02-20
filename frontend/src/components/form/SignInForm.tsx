import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(
        formValues.username?.trim().length > 0 &&
        formValues.password?.trim().length >= 6
      )
    )
      return "";

    console.log("clicked");
    // TODO : Api call
  };

  return (
    <form
      className="form w-full flex flex-col gap-2 lg:gap-4"
      onSubmit={submitHandler}
    >
      <FormInput
        placeholder="Phone number,username or email address"
        value={formValues.username}
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
        {/* TODO : Handle Api error  */}
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
