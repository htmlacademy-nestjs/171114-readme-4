import { Post } from '@project/shared/app-types';
import { DEFAULT_AMOUNT, DEFAULT_STATUS } from '../../../../../../apps/posts/src/app/post/post.constant';
import { PostStatus, PostType } from '@prisma/client';

export abstract class PostEntity implements Post{
  public _id?: number;
  public _userId?: string;
  public _originUserId?: string;
  public _originId?: number;
  public type: PostType;
  public createdDate: string;
  public postedDate: string;
  public status: PostStatus;
  public isReposted:boolean;
  public tags:string[];
  public likesCount:number;
  public commentsCount:number;

  constructor(postData: Post) {
    this._id = postData._id;
    this._userId = postData._userId;
    this._originUserId = postData._originUserId;
    this._originId = postData._originId;
    this.type = postData.type;
    this.createdDate = postData.createdDate;
    this.postedDate = postData.postedDate;
    this.status = postData.status;
    this.isReposted = postData.isReposted||DEFAULT_STATUS;
    this.tags = postData.tags;
    this.likesCount = postData.likesCount||DEFAULT_AMOUNT;
    this.commentsCount = postData.commentsCount||DEFAULT_AMOUNT;  }

  public toObject() {
    return {...this};
  }
}
