import { FormValues } from "./SignInForm";

type FormBtnProps = {
  type?: "submit" | "reset" | "button";
  text: "Log in" | "Sign Up";
  values?: FormValues;
};

const FormBtn: React.FC<FormBtnProps> = ({
  type = "submit",
  text,
  values = { username: "", password: "" },
}) => {
  let btnValidation;

  // console.log(btnValidation);
  if (text === "Log in") {
    btnValidation =
      values.username?.trim().length > 0 && values.password?.trim().length >= 6;
  }
  if (text === "Sign Up") {
  }

  return (
    <button
      type={type}
      className={`w-full my-2 lg:my-3 lg:py-2 lg:text-xl bg-[#0094f6a7] text-white font-semibold py-1 rounded-md ${
        btnValidation && "bg-[#0094f6]"
      }`}
    >
      {text}
    </button>
  );
};
export default FormBtn;
