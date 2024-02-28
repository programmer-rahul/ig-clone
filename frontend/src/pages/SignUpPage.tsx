import { Link } from "react-router-dom";
import SignUpForm from "../components/form/SignUpForm.tsx";

const SignUpPage = () => {
  return (
    <main className="h-screen w-screen border">
      <div className="flex w-full justify-center">
        <div className="container mt-20 flex w-96 flex-col gap-4 lg:w-[30rem] lg:gap-6">
          <div className="top flex flex-col items-center gap-4 border border-zinc-300 p-10 lg:gap-6">
            {/* <div className="flex flex-col items-center"> */}
            <div className="logo mb- mt-4 text-3xl font-bold lg:text-4xl">
              <h1>Instagram</h1>
            </div>
            <div className="mb-2 text-center text-base font-semibold text-neutral-600">
              Sign up to see photos and videos from your friends.
            </div>
            {/* </div> */}
            {/* form  */}
            <SignUpForm />
          </div>
          <div className="bottom border border-zinc-300  px-10 py-6 text-center text-xs lg:text-sm">
            <span>Have an account? </span>
            <Link
              to={"/signin"}
              className="text-sm font-bold text-[#4CB5F9] lg:text-base"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default SignUpPage;
