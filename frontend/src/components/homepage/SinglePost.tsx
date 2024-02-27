import { useState } from "react";
import Icon from "./Icon";

type PostProps = {
  postId: string;
  username: string;
  uploadedDate: string;
  avatar: string;
  description: string;

  commentsCount: number;
  likesCount: number;
  isFollowed: boolean;
  isSaved: boolean;
  isLiked: boolean;
};

const SinglePost = ({ post }: { post: PostProps }) => {
  const [postStates, setPostStates] = useState<PostProps>(post);
  const {
    avatar,
    commentsCount,
    description,
    isFollowed,
    isLiked,
    isSaved,
    likesCount,
    postId,
    uploadedDate,
    username,
  } = postStates;

  const [newCommentText, setNewCommentText] = useState("");

  const saveClickHandler = () => {
    setPostStates({ ...postStates, isSaved: !isSaved });

    // TODO : save api call
  };
  // console.log(post);

  const likeClickHandler = () => {
    setPostStates({ ...postStates, isLiked: !isLiked });

    // TODO : Like api call
  };
  const followBtnHandler = () => {
    setPostStates({ ...postStates, isFollowed: !isFollowed });

    // TODO : follow api call
  };

  return (
    <div className="post w-[470px] space-y-2 border">
      <div className="top flex justify-between px-2  ">
        <div className="left flex items-center gap-2">
          <div className="user-profile h-8 w-8 rounded-full border">
            {avatar}
          </div>
          <div className="user-info text-base">
            <span className="username font-semibold">{username}</span>
            <span> • </span>
            <span className="updated-days text-stone-400">{uploadedDate}</span>
            <span> • </span>
            <button
              className={` font-semibold ${
                isFollowed ? "text-stone-400" : "text-blue-600"
              }`}
              onClick={followBtnHandler}
            >
              {isFollowed ? "Following" : "Follow"}
            </button>
          </div>
        </div>
        <div className="right more-options">
          <Icon icon="dotIcon" />
        </div>
      </div>

      <div className="center h-[585px] w-full border">
        <video
          className="aspect-video h-full border border-red-900"
          src="video/one-piece.mp4"
          controls
        ></video>
      </div>

      <div className="bottom space-y-2">
        <div className="first flex items-center justify-between">
          <div className="left flex gap-4">
            <Icon
              // icon="heartIcon"
              icon={isLiked ? "likedIcon" : "heartIcon"}
              clickHandler={likeClickHandler}
            />
            <Icon icon="commentIcon" />
            <Icon icon="shareIcon" />
          </div>
          <div className="end">
            <Icon
              icon={isSaved ? "savedIcon" : "saveIcon"}
              clickHandler={saveClickHandler}
            />
          </div>
        </div>

        <div className="second text-base">
          <p className="likes ">
            <span className="font-semibold">{likesCount}</span>
            <span> likes</span>
          </p>
          <p className="description">
            <span className="username font-semibold">{username}</span>
            {"  "}
            <span className="text-sm">{description}</span>
            <span className="text-sm leading-3 text-stone-400">...more</span>
          </p>
          <p className="all-comments pt-2 text-sm text-stone-400">
            View all <span>{commentsCount}</span> Comments
          </p>

          <div className="add-new-comment relative text-stone-400">
            <textarea
              className="w-full resize-none bg-transparent pr-14 outline-none"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => {
                setNewCommentText(e.target.value);
              }}
              rows={1}
            ></textarea>
            <div className="absolute right-0 top-0 flex h-6 items-center gap-2">
              <button className="font-semibold text-blue-600">
                {newCommentText.trim().length > 0 && "Post"}
              </button>
              <Icon icon="emojiIcon" size="5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePost;
