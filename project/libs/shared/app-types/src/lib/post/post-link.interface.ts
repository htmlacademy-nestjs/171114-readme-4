import { Post } from "./post.interface.js";

export interface LinkPost extends Post {
  link: string;
  description?: string;
}
