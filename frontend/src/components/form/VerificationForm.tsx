import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import { useNavigate } from "react-router-dom";
import { getSignupDataFromLocal } from "../../utils/localStorage.ts";

const VerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [apiError, setApiError] = useState("");
  const { callApi, response, loading } = useAxios();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) return;

    const signupdata = getSignupDataFromLocal();
    callApi({
      method: "post",
      url: "/user/verify-otp",
      data: { otp, ...signupdata },
      cred: true,
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem("signupdata");
    if (!userData) return navigate("/signup");
  }, []);

  useEffect(() => {
    if (response) {
      console.log("Response recieved :- ", response);
      if (response.status) {
        localStorage.removeItem("signupdata");
        navigate("/profile-setup");
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
        type="number"
        placeholder="OTP"
        value={otp}
        loading={loading}
        onChange={(e) => {
          setOtp(e.target.value);
        }}
      />
      <FormBtn text="Verify" btnValidation={otp.length === 6 ? true : false} />
      <div className="errors text-center text-red-600 text-sm">
        {apiError && <p>{apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="text-center mx-auto font-bold loading-spinner"></p>
        )}
      </div>
    </form>
  );
};
export default VerificationForm;
