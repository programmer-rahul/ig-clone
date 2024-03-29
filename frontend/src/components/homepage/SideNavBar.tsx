import Icon from "./Icon";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useHome } from "../../context/HomeContext";
import IconLink from "./IconLink";

const SideNavBar = () => {
  const { setIsPopup, allNotifications } = useHome();
  const { user } = useAuth();

  return (
    <div className="sidebar flex h-[8%] items-center border-t border-stone-700 text-stone-300 md:h-full md:w-[10%] md:flex-col md:justify-between md:border-r md:border-t-0 md:py-4 xl:w-[20%] xl:px-4 2xl:w-[14%]">
      <ul className="flex w-full justify-between md:flex-col md:items-center md:gap-8  md:p-0 xl:items-start">
        {/* logo  */}
        <div className="mb-4">
          <Icon icon="instagramIcon" css="hidden md:block xl:hidden" />
          <h1 className="hidden text-2xl font-bold xl:block">Instagram</h1>
          <p>N - {allNotifications.length}</p>
        </div>

        <Link to="/">
          <IconLink icon="homeIcon" text="home" />
        </Link>
        <IconLink icon="searchIcon" text="search" css="hidden md:flex" />
        <IconLink icon="reelIcon" text="reels" />
        <IconLink
          icon="createIcon"
          text="create"
          clickHandler={() => {
            setIsPopup(true);
          }}
        />
        <Link to="/chat">
          <IconLink icon="messangerIcon" text="Messages" />
        </Link>
        <IconLink icon="heartIcon" text="Notifications" css="hidden md:flex" />

        <IconLink
          icon={user ? "profileIcon" : "defaultProfileIcon"}
          text="Profile"
        />
      </ul>

      {/* more settings  */}
      <div className="more-settings hidden w-full items-center justify-center gap-4 font-semibold md:flex xl:justify-start">
        <Icon icon="barIcon" />
        <p className="hidden xl:block">Settings</p>
      </div>
    </div>
  );
};
export default SideNavBar;
