import Topbar from "../components/homepage/Topbar";
import SuggestedUsers from "../components/homepage/SuggestedUsers";
import AllPostsContainer from "../components/homepage/AllPostsContainer";
import SideNavBar from "../components/homepage/SideNavBar";
import useHome from "../hooks/useHome";
import UploadPopUp from "../components/homepage/UploadPopUp";

const HomePage = () => {
  const { isPopup } = useHome();

  return (
    <main>
      <div
        className={`homepage flex h-screen flex-col justify-between bg-stone-900 md:flex-row-reverse lg:flex-row ${isPopup && "pointer-events-none opacity-80"}`}
      >
        {/* topbar  */}
        <Topbar />

        {/* all posts  */}
        <AllPostsContainer />

        {/* suggested-users */}
        <SuggestedUsers />

        {/* sidebar  */}
        <SideNavBar />
      </div>

      <div className="popups border border-red-500">
        {/*upload pop up  */}
        {isPopup && <UploadPopUp />}
      </div>
    </main>
  );
};
export default HomePage;
