import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { useEffect, useState } from "react";
import { Errors, formValidation } from "../../utils/validations.ts";
import { useNavigate } from "react-router-dom";
import { LocalStorage, apiHandler } from "../../utils/index.ts";
import { signupUser } from "../../api/index.ts";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formValidation({ formValues, setErrors }) && singupHandler();
  };

  const singupHandler = async () => {
    await apiHandler(
      () => signupUser(formValues),
      setLoading,
      () => {
        LocalStorage.set("signupdata", formValues);
        navigate("/verify-otp");
      },
      (err) => {
        setErrors({ ...errors, apiError: err });
      },
    );
  };

  useEffect(() => {
    const userData = LocalStorage.get("signupdata");
    if (userData) return navigate("/verify-otp");
  }, []);

  return (
    <form
      className="form flex w-full flex-col gap-2 lg:gap-4"
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
      <div className="errors text-center text-sm text-red-600">
        {errors && <p>{errors.apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="loading-spinner mx-auto text-center font-bold"></p>
        )}
      </div>
    </form>
  );
};
export default SignUpForm;
