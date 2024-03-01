export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    localPath: string;
  };
}
