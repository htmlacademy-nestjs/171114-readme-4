import { LinkPostEntity } from '../../../../../../libs/repositories/post-repository/src/lib/entity/post-link.entity';
import { PhotoPostEntity } from '../../../../../../libs/repositories/post-repository/src/lib/entity/post-photo.entity';
import { QuotePostEntity } from '../../../../../../libs/repositories/post-repository/src/lib/entity/post-quote.entity';
import { TextPostEntity } from '../../../../../../libs/repositories/post-repository/src/lib/entity/post-text.entity';
import { VideoPostEntity } from '../../../../../../libs/repositories/post-repository/src/lib/entity/post-video.entity';

export const TypeEntityAdapter = {
  'link': LinkPostEntity,
  'photo': PhotoPostEntity,
  'quote': QuotePostEntity,
  'text': TextPostEntity,
  'video': VideoPostEntity
}
