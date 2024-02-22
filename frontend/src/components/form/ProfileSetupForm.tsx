import FormBtn from "./FormBtn.tsx";
import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import { useNavigate } from "react-router-dom";

const VerificationForm = () => {
  const [selectedImage, setSelectedImage] = useState("default-profile.svg");
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiError, setApiError] = useState("");
  const { callApi, response, loading } = useAxios();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("clicked");
    if (inputRef.current?.files?.length === 0) return inputRef.current?.click();

    // next logic for file selected
  };
  const skipBtnHandler = () => {};

  const inputChangeHandler = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    inputRef.current?.files && reader.readAsDataURL(inputRef.current?.files[0]);
  };

  useEffect(() => {
    console.log("rendered");
    const userData = localStorage.getItem("signupdata");
    // if (!userData) return navigate("/signup");
  }, []);

  useEffect(() => {
    if (response) {
      console.log("Response recieved :- ", response);
      if (response.status) {
      } else {
        // TODO : Error handling
      }
    }
  }, [response]);

  return (
    <form
      className="form w-full flex flex-col gap-2 lg:gap-4 items-center h-full justify-between"
      onSubmit={submitHandler}
    >
      <div className="profile w-32 h-32  rounded-full">
        <img
          src={selectedImage}
          alt="profile-image"
          className="w-full h-full object-cover rounded-full"
          ref={imageRef}
        />
      </div>
      <div className="buttons  w-full flex items-center flex-col md:flex-row-reverse md:gap-8">
        <input
          type="file"
          ref={inputRef}
          onChange={inputChangeHandler}
          accept="image/*"
          className="hidden"
        />
        <FormBtn
          text="Add Picture"
          type="submit"
          btnValidation={selectedImage === "default-profile.svg" ? false : true}
        />
        <FormBtn text="Skip" type="button" clickHandler={skipBtnHandler} />
      </div>
    </form>
  );
};
export default VerificationForm;
