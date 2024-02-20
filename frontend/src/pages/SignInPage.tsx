import SignInForm from "../components/form/SignInForm.tsx";

const SignInPage = () => {
  return (
    <main className="w-screen h-screen border">
      <div className="flex w-full justify-center">
        <div className="container mt-20 w-96 lg:w-[30rem] flex flex-col gap-4 lg:gap-6">
          <div className="top flex border border-zinc-300 flex-col p-10 items-center gap-4 lg:gap-6">
            <div className="logo mb-8 mt-4 text-3xl lg:text-4xl font-bold">
              <h1>Instagram</h1>
            </div>
            {/* form  */}
            <SignInForm />
          </div>
          <div className="bottom border border-zinc-300  lg:text-sm px-10 py-6 text-xs text-center">
            <span>Don't have an account? </span>
            <span className="text-[#4CB5F9] font-bold text-sm lg:text-base">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignInPage;
