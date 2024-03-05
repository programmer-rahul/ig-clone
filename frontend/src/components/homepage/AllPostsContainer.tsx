import { useEffect, useState } from "react";
// import allPosts from "../../utils/allPosts";
import SinglePost from "./SinglePost";
import { apiHandler } from "../../utils";
import { fetchAllPosts } from "../../api";
import { PostInterface } from "../../interfaces/post";

const AllPostsContainer = () => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      await apiHandler(
        () => fetchAllPosts(),
        null,
        (res) => {
          // console.log(res.data.posts);
          setAllPosts(res.data.posts);
        },
        (err) => {
          console.log("Error from response", err);
        },
      );
    };

    apiCall();
  }, []);

  return (
    <div className="posts no-scrollbar h-full w-full overflow-scroll overflow-x-auto p-4 text-xs text-stone-300 md:w-full lg:order-2 lg:w-2/3">
      {/* stories  */}
      <div className="stories"></div>

      <div className="all-posts flex flex-col items-center gap-20 pt-8">
        {allPosts?.map((post: any, index) => {
          const newPost: PostInterface = post;
          newPost["postId"] = post._id;
          newPost["postPath"] = post.path;
          newPost["uploadedDate"] = "2w"; // add create at here

          // console.log(newPost);
          return <SinglePost key={index} post={newPost} />;
        })}
      </div>
    </div>
  );
};
export default AllPostsContainer;
