import Icon from "./Icon";

const Topbar = () => {
  return (
    <div className="topbar border-b border-stone-700 h-[8%] flex items-center text-stone-300 justify-between px-4 md:hidden lg:order-1">
      <p className="logo text-3xl font-bold">Instagram</p>
      <div className="search-input rounded-md flex items-center py-2 px-3  gap-4 bg-stone-800  text-xs min-w-72">
        <Icon icon="searchIcon" size="6" />
        <input
          type="text"
          className="bg-transparent outline-none text-sm"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
export default Topbar;
