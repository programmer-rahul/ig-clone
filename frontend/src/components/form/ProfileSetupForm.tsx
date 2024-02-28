import FormBtn from "./FormBtn.tsx";
import { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import { useNavigate } from "react-router-dom";
import { storeUserInLocal } from "../../utils/localStorage.ts";
import useAuth from "../../hooks/useAuth.ts";

const VerificationForm = () => {
  const [selectedImage, setSelectedImage] = useState("default-profile.svg");
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { callApi, response } = useAxios();
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("clicked");
    if (inputRef.current?.files?.length === 0) return inputRef.current?.click();

    // next logic for file selected
    if (inputRef.current?.files?.length === 0) return "";
    const formData = new FormData();
    inputRef.current?.files &&
      formData.append("avatar", inputRef.current.files[0]);

    await callApi({
      method: "put",
      url: "/user/update-avatar",
      data: formData,
      cred: true,
    });
  };

  const inputChangeHandler = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    inputRef.current?.files && reader.readAsDataURL(inputRef.current?.files[0]);
  };

  useEffect(() => {
    if (response) {
      console.log("Response recieved :- ", response);
      if (response.status) {
        console.log(response.data);
        response.data?.user && storeUserInLocal(response.data.user);
        setIsAuth(true);
        navigate("/");
      }
    }
  }, [response]);

  return (
    <form
      className="form flex h-full w-full flex-col items-center justify-between gap-2 lg:gap-4"
      onSubmit={submitHandler}
    >
      <div className="profile h-32 w-32  rounded-full">
        <img
          src={selectedImage}
          alt="profile-image"
          className="h-full w-full rounded-full object-cover"
          ref={imageRef}
        />
      </div>
      <div className="buttons  flex w-full flex-col items-center md:flex-row-reverse md:gap-8">
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
        <FormBtn
          text="Skip"
          type="button"
          clickHandler={() => {
            navigate("/");
          }}
        />
      </div>
    </form>
  );
};
export default VerificationForm;
