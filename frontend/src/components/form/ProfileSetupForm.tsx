import FormBtn from "./FormBtn.tsx";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage, apiHandler } from "../../utils/index.ts";
import { updateAvatar } from "../../api/index.ts";
import { useAuth } from "../../context/AuthContext.tsx";

const ProfileSetupForm = () => {
  const [selectedImage, setSelectedImage] = useState("default-profile.svg");
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.files?.length === 0) return inputRef.current?.click();

    // next logic for file selected
    if (inputRef.current?.files?.length === 0) return "";
    const formData = new FormData();
    inputRef.current?.files &&
      formData.append("avatar", inputRef.current.files[0]);

    updateProfileHandler(formData);
  };

  const updateProfileHandler = async (formData: FormData) => {
    await apiHandler(
      () => updateAvatar(formData),
      null,
      (data) => {
        setUser(data.data.user);
        LocalStorage.set("user", data.data.user);
        navigate("/");
      },
      () => {},
    );
  };

  const inputChangeHandler = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    inputRef.current?.files && reader.readAsDataURL(inputRef.current?.files[0]);
  };

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
export default ProfileSetupForm;
