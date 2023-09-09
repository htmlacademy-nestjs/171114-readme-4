export const LikesError = {
  PostNotFound : ' Post  is not found',
  PostNotPosted : ' Can`t add like. Post  is not posted',
  LikeNotFound: "Like is not existing",
  LikeExists: "Like already added"
} as const;

export const LikesMessages = {
  Add : "Like added successfully",
  Show: "Like showing"
} as const;

export const LikesPath = {
  Main:'likes',
  Id:':postId',
}as const;

export const  API_TAG_NAME ='likes'
