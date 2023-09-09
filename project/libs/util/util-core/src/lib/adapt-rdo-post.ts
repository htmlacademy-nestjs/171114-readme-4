import { PostContentType } from '@project/shared/app-types';
import { fillObject } from '@project/util/util-core';
import { LinkPostRdo } from '../../../../../apps/posts/src/app/post/rdo/post-link.rdo';
import { PhotoPostRdo } from '../../../../../apps/posts/src/app/post/rdo/post-photo.rdo';
import { QuotePostRdo } from '../../../../../apps/posts/src/app/post/rdo/post-quote.rdo';
import { TextPostRdo } from '../../../../../apps/posts/src/app/post/rdo/post-text.rdo';
import { VideoPostRdo } from '../../../../../apps/posts/src/app/post/rdo/post-video.rdo';
import { PostType } from '@prisma/client';

export function adaptRdoPost(post: PostContentType) {
  switch (post.type) {
    case PostType.link:
      return fillObject(LinkPostRdo, post);
    case PostType.photo:
      return fillObject(PhotoPostRdo, post);
    case PostType.quote:
      return fillObject(QuotePostRdo, post);
    case PostType.text:
      return fillObject(TextPostRdo, post);
    case PostType.video:
      return fillObject(VideoPostRdo, post);
    }
}
