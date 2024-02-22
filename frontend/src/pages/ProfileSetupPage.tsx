import ProfileSetupForm from "../components/form/ProfileSetupForm.tsx";

const ProfileSetupPage = () => {
  return (
    <main className="w-screen h-screen border">
      <div className="flex w-full justify-center">
        <div className="container mt-20 w-96 min-h-[700px] lg:w-[30rem] flex flex-col gap-4 lg:gap-6">
          <div className=" h-full top flex border border-zinc-300 flex-col p-10 items-center gap-8 lg:gap-6">
            <div className="space-y-2">
              <div className="mt-4 text-center text-2xl lg:text-4xl font-bold">
                <h1>Add a profile picture</h1>
              </div>
              <div className="font-semibold text-neutral-600 text-base text-center mb-2">
                <p>
                  Add a profile picture so that your friends know it's you.
                  Everyone will be able to see your picture.
                </p>
              </div>
            </div>
            <ProfileSetupForm />
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProfileSetupPage;
