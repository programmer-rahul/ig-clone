import React from "react";

export type FormBtnProps = {
  type?: "submit" | "reset" | "button";
  text: string;
  btnValidation?: boolean;
  clickHandler?: () => void;
};

const FormBtn: React.FC<FormBtnProps> = ({
  type = "submit",
  text,
  btnValidation = false,
  clickHandler,
}) => {
  let btnCss = "text-xl py-2 border-2 ";

  // Adjust CSS class based on button text
  switch (text) {
    case "Add Picture":
      btnCss += " border-transparent bg-[#7ec1edfe]";
      break;
    case "Skip":
      btnCss += " text-zinc-800 bg-neutral-100 ";
      break;
    default:
      btnCss += " bg-[#7ec1edfe] ";
  }

  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`${btnCss} w-full my-2 lg:my-3 lg:py-2 lg:text-xl text-white font-semibold py-1  rounded-md  ${
        btnValidation && "bg-[#2587c8]"
      }`}
    >
      {text}
    </button>
  );
};

export default FormBtn;
