import { useEffect, useRef, useState } from "react";
import AddNewUserPopUp from "./AddNewUserPopUp";
import ChatUser from "./ChatUser";

const AllChatUserContainer = () => {
  const [searchPopUp, setSearchPopUp] = useState(false);
  const searchPopUpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const windowClickHandler = (event: MouseEvent) => {
      if (
        searchPopUp &&
        !searchPopUpRef.current?.contains(event.target as Node)
      ) {
        setSearchPopUp(false);
      }
    };

    document.addEventListener("mousedown", windowClickHandler);
    return () => {
      document.removeEventListener("mousedown", windowClickHandler);
    };
  }, [searchPopUp]);

  return (
    <>
      <div className="all-chats-users no-scrollbar h-full w-1/5 overflow-y-scroll bg-stone-900 p-2 text-xs text-stone-300 md:w-1/4 lg:w-1/3 2xl:w-1/4">
        {/* stories  */}
        <div className="add-new-user ">
          <div className="flex items-center justify-center md:justify-between ">
            <p className="username hidden text-base font-bold md:block lg:text-xl">
              username
            </p>
            <div
              className=""
              onClick={() => {
                setSearchPopUp(true);
              }}
            >
              <img
                src="addNewUser.svg"
                className="mx-auto w-10 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="all-users posts flex flex-col items-start bg-transparent pt-4">
          <div>
            <p className="my-2 hidden text-xl font-bold lg:block">Messages</p>
          </div>
          <div className="mt-2 flex w-full flex-col gap-4">
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
            <ChatUser />
          </div>
        </div>
      </div>

      {searchPopUp && (
        <div ref={searchPopUpRef}>
          <AddNewUserPopUp />
        </div>
      )}
    </>
  );
};
export default AllChatUserContainer;
