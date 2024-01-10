import { IComment } from "./i-comment";
import { IUser } from "./i-user";

export interface IPrompt{
  id: string;
  title: string;
  description: string;
  promptText: string;
  inputs: string[];
  sampleOutput: string;
  author: IUser;
  starUsers: IUser[];
  comments: IComment[]
}

// export interface IPrompt{
//   id: string;
//   title: string;
//   description: string;
//   promptText: string;
//   inputs: string[];
//   sampleOutput: string;
//   authorId: string;
//   starUserId: string[];
//   commentsId: string[]
// }
