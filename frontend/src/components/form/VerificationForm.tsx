import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios.ts";
import { Errors, formValidation } from "../../utils/validations.ts";
import { useNavigate } from "react-router-dom";

const VerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [apiError, setApiError] = useState("");
  const { callApi, response, loading } = useAxios();
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    otp.length === 6 &&
      callApi({ method: "post", url: "/user/signup", data: otp });
  };

  useEffect(() => {
    console.log("rendered");
    const userData = localStorage.getItem("signupdata");
    if (!userData) return navigate("/signup");
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
