import { Link } from "react-router-dom";
import SignInForm from "../components/form/SignInForm.tsx";

const SignInPage = () => {
  return (
    <main className="h-screen w-screen border">
      <div className="flex w-full justify-center">
        <div className="container mt-20 flex w-96 flex-col gap-4 lg:w-[30rem] lg:gap-6">
          <div className="top flex flex-col items-center gap-4 border border-zinc-300 p-10 lg:gap-6">
            <div className="logo mb-8 mt-4 text-3xl font-bold lg:text-4xl">
              <h1>Instagram</h1>
            </div>
            {/* form  */}
            <SignInForm />
          </div>
          <div className="bottom border border-zinc-300  px-10 py-6 text-center text-xs lg:text-sm">
            <span>Don't have an account? </span>
            <Link
              to={"/signup"}
              className="text-sm font-bold text-[#4CB5F9] lg:text-base"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignInPage;
