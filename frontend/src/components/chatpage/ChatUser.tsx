const ChatUser = () => {
  return (
    <div className="user flex cursor-pointer items-center justify-center gap-2 bg-stone-900 p-4 transition-all hover:bg-stone-600 lg:flex lg:p-2">
      <div className="profile">
        <img
          src="luffy.jpg"
          alt="user-profile"
          className="aspect-square max-w-16 rounded-full object-cover lg:max-w-14 xl:max-w-16"
        />
      </div>

      <div className="hidden w-full lg:block">
        <div className="font-semibold capitalize text-white">
          <p>Fullname</p>
        </div>

        <div className="lastmessage relative flex w-full justify-between gap-2 text-stone-500 ">
          <p>this is last message</p>
          <p className="absolute right-0">2m</p>
        </div>
      </div>
    </div>
  );
};
export default ChatUser;
