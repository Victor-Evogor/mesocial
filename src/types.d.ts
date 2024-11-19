export interface User {
    id: string;
    name: string;
    username: string;
}

export interface Conversation {
    id: string;
    user?: User;
    lastMessage?: string;
    participants: string[],
    lastMessage: string,
    lastMessageTime: string,
    messages: Message[]
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
  };
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: URL;
    file: File[];
    location?: string;
    tags?: string;
  };
  
  export type IUser = {
    $id?: string,
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };
  
  export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
  
  export type Conversation = {
    id: string;
    participants: string[];
    lastMessage?: string;
    lastMessageTime?: Date;
  };
  
export interface Message {
  id: string;
  content: string;
  senderId: string;
}