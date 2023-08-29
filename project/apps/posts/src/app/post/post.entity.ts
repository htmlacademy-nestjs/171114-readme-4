import { Comment, Post } from '@project/shared/app-types';
import { PostStatus } from 'libs/shared/app-types/src/lib/post-status.enum';
import { PostType } from 'libs/shared/app-types/src/lib/post-type.enum';

export class PostEntity implements Post {
  public postId: number;
  public title: string;
  public tegs: string[];
  public author: string;
  public createAt: Date;
  public publishAt: Date;
  public status: PostStatus;
  public likesCount: number;
  public repost: boolean;
  public originAuthor: string;
  public originId: string;
  public type: PostType;
  public content: string;

  constructor(post: Post) {
    this.fillEntity(post);
  }
  comments: Comment[];

  public toObject() {
    return {
      ... this,
      comments: [...this.comments],
    };
  }

  public fillEntity(post: Post): void {
    this.title = post.title;
    this.tegs = post.tegs;
    this.author = post.author;
    this.createAt = new Date();
    this.publishAt = new Date();
    this.status = post.status;
    this.likesCount = post.likesCount;
    this.repost = post.repost;
    this.originAuthor = post.originAuthor;
    this.originId = post.originId;
    this.type = post.type;
    this.content = post.content;
    this.comments = [];
  }
}
