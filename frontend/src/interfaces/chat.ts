export interface ChatUserInterface {
  _id: string;
  username: string;
  avatar: {
    url: string;
  };
  fullname?: string;
}

export interface ChatMessageInterface {
  _id?: string;
  sender: string;
  receiver: string;
  content: string;
}
