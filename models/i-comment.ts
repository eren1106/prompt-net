import { IUser } from "./i-user";

export interface IComment{
  id: string;
  user: IUser;
  commentText: string;
}

// export interface IComment{
//   id: string;
//   userId: string;
//   commentText: string;
// }