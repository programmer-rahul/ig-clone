export type IconNames =
  | "heartIcon"
  | "likedIcon"
  | "commentIcon"
  | "shareIcon"
  | "saveIcon"
  | "savedIcon"
  | "emojiIcon"
  | "barIcon"
  | "dotIcon"
  | "searchIcon"
  | "homeIcon"
  | "reelIcon"
  | "createIcon"
  | "messangerIcon"
  | "defaultProfileIcon"
  | "profileIcon"
  | "instagramIcon";

export interface User {
  _id: string;
  username: string;
  fullname : string,
  email: string;
  avatar: string;
  refreshToken: string;
}
