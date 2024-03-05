import { ChangeEvent, useState } from "react";
import { apiHandler } from "../../utils";
import { findUser } from "../../api";

const AddNewUserPopUp = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedUser, searchedUsers] = useState([]);

  const searchInputHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    if (searchText.length > 3) {
      console.log("yes");

      await apiHandler(
        () => findUser(e.target.value),
        null,
        (res) => {
          console.log(res);
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
          onChange={searchInputHandler}
        />
      </div>
      <div className="searched-users mx-4 mt-4 space-y-2">
        <div className="searched-user flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-xl hover:bg-stone-800">
          <div>
            <img
              src="luffy.jpg"
              alt="user-profile"
              className="aspect-square w-10 rounded-full object-cover"
            />
          </div>
          <p>rahul262830</p>
        </div>
      </div>
    </div>
  );
};
export default AddNewUserPopUp;
