import { FormValues } from "./SignInForm";

type FormBtnProps = {
  type?: "submit" | "reset" | "button";
  text: "Log in" | "Sign up";
  values?: FormValues;
};

const FormBtn: React.FC<FormBtnProps> = ({
  type = "submit",
  text,
  values = { username: "", password: "" },
}) => {
  return (
    <button
      type={type}
      className={`w-full my-2 lg:my-3 lg:py-2 lg:text-xl bg-[#4CB5F9] text-white font-semibold py-1 rounded-md ${
        values.username?.trim().length > 0 &&
        values.password?.trim().length >= 6 &&
        "bg-[#0095F6]"
      }`}
    >
      {text}
    </button>
  );
};
export default FormBtn;
