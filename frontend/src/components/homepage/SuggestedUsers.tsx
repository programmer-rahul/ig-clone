import Icon from "./Icon";

const SuggestedUsers = () => {
  return (
    <div className="suggested-users hidden lg:block lg:w-1/3 lg:order-3">
      <div className="w-80 space-y-4 text-white py-8">
        <div className="flex justify-between items-center">
          <p className="text-stone-400 font-semibold">Suggested for you</p>
          <p>See All</p>
        </div>

        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
      </div>
    </div>
  );
};
export default SuggestedUsers;

const SuggestedUser = () => {
  return (
    <div className="flex justify-between">
      <div className="left gap-2 flex items-center font-semibold text-xl">
        <Icon icon="defaultProfileIcon" size="10" />
        <p>username</p>
      </div>
      <div className="right text-blue-400 font-semibold cursor-pointer">
        Follow
      </div>
    </div>
  );
};
