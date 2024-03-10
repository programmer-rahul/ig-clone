import { useState } from "react";
import { apiHandler } from "../../utils";
import { findUser } from "../../api";
import { useChat } from "../../context/ChatContext";
import { ChatUserInterface } from "../../interfaces/chat";

const AddNewUserPopUp = () => {
  const [searchText, setSearchText] = useState("");
  const [allSearchedUsers, setAllSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchInputHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      setAllSearchedUsers([]);
      await apiHandler(
        () => findUser(searchText),
        setLoading,
        (res) => {
          setAllSearchedUsers(res.data.user);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  };

  return (
    <div className="search-user absolute left-[32rem] top-12 z-10 h-72 w-96 rounded-lg bg-stone-700 text-white">
      <div className="mx-4 my-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-full border-2 border-dashed border-stone-500 bg-transparent px-4 py-1 text-xl outline-none"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={searchInputHandler}
        />
      </div>
      <div className="searched-users mx-4 mt-4 space-y-2">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          allSearchedUsers?.map((user: any, index) => {
            return <SearchedUser key={index} user={user} />;
          })
        )}
      </div>
    </div>
  );
};
export default AddNewUserPopUp;

const SearchedUser = ({ user }: { user: ChatUserInterface }) => {
  const { setAllChatUsers, setSearchPopUp, setSelectedChat } = useChat();

  const userClickHandler = async () => {
    setAllChatUsers((prev) => {
      return prev.some((chatUser) => chatUser._id === user._id)
        ? prev
        : [...prev, user];
    });
    setSelectedChat(user);
    setSearchPopUp(false);
  };

  return (
    <div
      className="searched-user flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-xl hover:bg-stone-800"
      onClick={userClickHandler}
    >
      <div>
        <img
          src={user.avatar?.url}
          alt="user-profile"
          className="aspect-square w-10 rounded-full object-cover"
        />
      </div>
      <p>{user.username}</p>
    </div>
  );
};
