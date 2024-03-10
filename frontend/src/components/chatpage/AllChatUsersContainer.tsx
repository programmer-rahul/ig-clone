import { useEffect, useRef } from "react";
import AddNewUserPopUp from "./AddNewUserPopUp";
import ChatUser from "./ChatUser";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { apiHandler } from "../../utils";
import { getAllChatUsers } from "../../api";
import { useSocket } from "../../context/SocketContext";

const AllChatUserContainer = () => {
  const searchPopUpRef = useRef<HTMLDivElement>(null);

  const { allChatUsers, searchPopUp, setSearchPopUp, setAllChatUsers } =
    useChat();

  const { user } = useAuth();
  const { socket } = useSocket();

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

  useEffect(() => {
    const runApi = async () => {
      await apiHandler(
        () => getAllChatUsers(),
        null,
        (res) => {
          setAllChatUsers(res.data.allChatUsers);
        },
        (err) => {
          console.log(err);
        },
      );
    };
    runApi();
  }, []);

  useEffect(() => {
    // console.log(socket);
    if (!socket || allChatUsers.length === 0) return;
    socket.emit("find-online-users", allChatUsers);
  }, [socket, allChatUsers]);

  return (
    <>
      <div className="all-chats-users no-scrollbar h-full w-1/5 overflow-y-scroll bg-stone-900 p-2 text-xs text-stone-300 md:w-1/4 lg:w-1/3 2xl:w-1/4">
        {/* add new user  */}
        <div className="add-new-user ">
          <div className="flex items-center justify-center md:justify-between ">
            <p className="username hidden text-base font-bold md:block lg:text-xl">
              {user?.username}
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
            {allChatUsers?.map((chatUser, index) => {
              return <ChatUser chatUser={chatUser} key={index} />;
            })}
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
