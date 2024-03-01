import FormInput from "./FormInput.tsx";
import FormBtn from "./FormBtn.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage, apiHandler } from "../../utils/index.ts";
import { verifyOtp } from "../../api/index.ts";

const VerificationForm = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) return;
    verificationHandler();
  };

  const verificationHandler = async () => {
    const signUpData = LocalStorage.get("signupdata");
    await apiHandler(
      () => verifyOtp({ otp, ...signUpData }),
      setLoading,
      (data) => {
        console.log(data);
        LocalStorage.remove("signupdata");
        LocalStorage.set("user", data.data.user);
        LocalStorage.set("token", data.data.accessToken);
        navigate("/profile-setup");
      },
      (err) => {
        setApiError(err);
      },
    );
  };

  useEffect(() => {
    const userData = LocalStorage.get("signupdata");
    if (!userData) return navigate("/signup");
  }, []);

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
