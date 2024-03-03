export interface PostInterface {
  postId: string;
  author: {
    username: string;
    avatar: string;
    _id: string;
  };
  postPath: string;
  description: string;
  postType: "video" | "image";
  likesCount: number;
  commentsCount: number;
  comments: [];

  isLiked: boolean;
  isFollowed: boolean;
  isSaved: boolean;

  uploadedDate: string;
}
