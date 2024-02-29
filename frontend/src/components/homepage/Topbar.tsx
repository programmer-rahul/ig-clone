import Icon from "./Icon";

const Topbar = () => {
  return (
    <div className="topbar flex h-[8%] items-center justify-between border-b border-stone-700 px-4 text-stone-300 md:hidden lg:order-1">
      <p className="logo text-3xl font-bold">Instagram</p>
      <div className="search-input flex min-w-72 items-center gap-4 rounded-md  bg-stone-800 px-3  py-2 text-xs">
        <Icon icon="searchIcon" size="6" />
        <input
          type="text"
          className="bg-transparent text-sm outline-none"
          placeholder="Search"
        />
      </div>
    </div>
  );
};
export default Topbar;
