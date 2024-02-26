import allPosts from "../../utils/allPosts";
import SinglePost from "./SinglePost";

const AllPostsContainer = () => {
  return (
    <div className="posts h-full text-stone-300 text-xs overflow-scroll overflow-x-auto p-4 md:w-ful lg:w-2/3 lg:order-2 w-full">
      {/* stories  */}
      <div className="stories"></div>

      <div className="all-posts border flex flex-col items-center gap-4 pt-8">
        {allPosts?.map((post, index) => {
          return <SinglePost key={index} post={post} />;
        })}
      </div>
    </div>
  );
};
export default AllPostsContainer;
