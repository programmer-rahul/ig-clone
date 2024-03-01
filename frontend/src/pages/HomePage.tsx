import Topbar from "../components/homepage/Topbar";
import SuggestedUsers from "../components/homepage/SuggestedUsers";
import AllPostsContainer from "../components/homepage/AllPostsContainer";
import SideNavBar from "../components/homepage/SideNavBar";
import useHome from "../hooks/useHome";
import UploadPopUp from "../components/homepage/UploadPopUp";
import ClosePopupIcon from "../components/reusable/ClosePopupIcon";

const HomePage = () => {
  const { isPopup } = useHome();

  return (
    <main>
      <div className={`homepage h-screen`}>
        <div
          className={`flex h-full flex-col justify-between bg-stone-900 md:flex-row-reverse lg:flex-row  ${isPopup && "pointer-events-none blur-[2px]"}`}
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

        {isPopup && (
          <div className="popups absolute left-0 top-0 h-full w-full">
            {isPopup && <UploadPopUp />}
            {/* cross icon  */}
            <ClosePopupIcon />
          </div>
        )}
      </div>
    </main>
  );
};
export default HomePage;
