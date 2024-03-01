import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.tsx";

const SignInForm = () => {
  const [formValues, setFormValues] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        formValues.username?.trim().length > 0 &&
        formValues.password?.trim().length >= 6
      )
    )
      return;

    const response = await signin({
      data: formValues,
      options: { _setApiError: setApiError, _setLoading: setLoading },
    });
    console.log(response);
  };

  return (
    <form
      className="form flex w-full flex-col gap-2 lg:gap-4"
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
      <FormBtn
        text="Log in"
        btnValidation={
          formValues.username?.trim().length > 0 &&
          formValues.password?.trim().length >= 6
            ? true
            : false
        }
      />
      <div className="line relative my-2 flex w-full flex-col items-center justify-center">
        <span className="absolute bg-white px-4 font-semibold lg:text-xl">
          OR
        </span>
        <hr className="w-full border-zinc-300" />
      </div>
      <div className="apiError text-center text-sm text-red-600">
        {/* TODO : Handle Api error  */}
        {apiError && <p>{apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="loading-spinner mx-auto text-center font-bold"></p>
        )}
      </div>
      <Link
        className="mt-2 text-center text-xs lg:text-sm"
        to={"/forgot-password"}
      >
        Forgotten your password?
      </Link>
    </form>
  );
};
export default SignInForm;
