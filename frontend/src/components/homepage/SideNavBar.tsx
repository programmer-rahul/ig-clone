import Icon from "./Icon";
import IconLink from "./IconLink";

const SideNavBar = () => {
  return (
    <div className="sidebar border-t md:border-t-0 md:border-r border-stone-700 h-[8%] text-stone-300 items-center flex md:h-full md:w-[10%] md:flex-col md:justify-between md:py-4 xl:w-[20%] xl:px-4 2xl:w-[14%]">
      <ul className="flex justify-between w-full md:flex-col md:gap-8 md:items-center  xl:items-start md:p-0">
        {/* logo  */}
        <div className="mb-4">
          <Icon icon="instagramIcon" css="hidden md:block xl:hidden" />
          <h1 className="xl:block hidden text-2xl font-bold">Instagram</h1>
        </div>

        <IconLink icon="homeIcon" text="home" />
        <IconLink icon="searchIcon" text="search" css="hidden md:flex" />
        <IconLink icon="reelIcon" text="reels" />
        <IconLink icon="createIcon" text="create" />
        <IconLink icon="messangerIcon" text="Messages" />
        <IconLink icon="heartIcon" text="Notifications" css="hidden md:flex" />
        <IconLink icon="defaultProfileIcon" text="Profile" />
        {/* <img src="comment.svg" alt="bar" style={{ fill: "var(--svg-color)" }} /> */}
      </ul>

      {/* more settings  */}
      <div className="more-settings w-full hidden items-center gap-4 md:flex justify-center xl:justify-start font-semibold">
        <Icon icon="barIcon" />
        <p className="hidden xl:block">Settings</p>
      </div>
    </div>
  );
};
export default SideNavBar;
