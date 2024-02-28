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
        // console.log(response.data);
        if (!response.data) return;
        localStorage.setItem(
          "current-user",
          JSON.stringify(response.data?.user),
        );
        navigate("/profile-setup");
      } else {
        setApiError(response.message);
      }
    }
  }, [response]);

  return (
    <form
      className="form flex w-full flex-col gap-2 lg:gap-4"
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
      <div className="errors text-center text-sm text-red-600">
        {apiError && <p>{apiError}</p>}
      </div>
      <div>
        {loading && (
          <p className="loading-spinner mx-auto text-center font-bold"></p>
        )}
      </div>
    </form>
  );
};
export default VerificationForm;
