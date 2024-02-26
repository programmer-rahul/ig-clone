import Icon from "./Icon";

type PostProps = {
  postId: string;
  username: string;
  avatar: string;
  uploadedAt: string;
  totalLikes: number;
  description: string;

  isSaved: boolean;
};

const SinglePost = () => {
  const saveClickHandler = () => {
    // TODO : Logic for saving file in db
    // isLiked : false
  };

  return (
    <div className="post w-[470px] bg-stone-800 space-y-2">
      <div className="top flex justify-between px-2  ">
        <div className="left flex gap-2 items-center">
          <div className="user-profile w-8 h-8 border rounded-full"></div>
          <div className="user-info text-base">
            <span className="username font-semibold">satis.yadav.304</span>
            <span> • </span>
            <span className="updated-days text-stone-400">2 w</span>
            <span> • </span>
            <span className="text-blue-600 font-semibold">Follow</span>
          </div>
        </div>
        <div className="right more-options">
          <Icon icon="dotIcon" />
        </div>
      </div>

      <div className="center w-full border h-[585px]"></div>

      <div className="bottom space-y-2">
        <div className="first flex justify-between items-center">
          <div className="left flex gap-4">
            <Icon icon="heartIcon" />
            <Icon icon="commentIcon" />
            <Icon icon="shareIcon" />
          </div>
          <div className="end">
            <Icon icon="saveIcon" clickHandler={saveClickHandler} />
          </div>
        </div>

        <div className="second text-base">
          <p className="likes ">
            <span className="font-semibold">1,33,032</span>
            <span> likes</span>
          </p>
          <p className="description">
            <span className="username font-semibold">satis.yadav.304</span>
            {"  "}
            <span className="text-sm">Felicidade é fazer o outro feliz 🌻</span>
            <p className="leading-3 text-stone-400 text-sm">...more</p>
          </p>
          <p className="all-comments text-stone-400 text-sm pt-2">
            View all <span>8,341</span> Comments
          </p>

          <div className="add-new-comment text-stone-400 relative">
            <textarea
              className="bg-transparent w-full pr-14 resize-none outline-none"
              placeholder="Add a comment..."
              rows={1}
            ></textarea>
            <div className="absolute right-0 top-0   flex items-center gap-2">
              <button className="text-blue-600 font-semibold ">Post</button>
              <Icon icon="emojiIcon" size="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePost;
