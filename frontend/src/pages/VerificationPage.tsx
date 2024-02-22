import VerificationForm from "../components/form/VerificationForm.tsx";

const VerificationPage = () => {
  return (
    <main className="w-screen h-screen border">
      <div className="flex w-full justify-center">
        <div className="container mt-20 w-96 lg:w-[30rem] flex flex-col gap-4 lg:gap-6">
          <div className="top flex border border-zinc-300 flex-col p-10 items-center gap-4 lg:gap-6">
            <div className="logo mb- mt-4 text-3xl lg:text-4xl font-bold">
              <h1>Verify Your Account</h1>
            </div>
            <div className="font-semibold text-neutral-600 text-base text-center mb-2">
              <p>
                Please enter the verification code sent to your email or phone
                number.
              </p>
            </div>
            <VerificationForm />
          </div>
        </div>
      </div>
    </main>
  );
};
export default VerificationPage;
