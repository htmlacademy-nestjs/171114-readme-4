import { LinkPostEntity } from './post-link.entity';
import { PhotoPostEntity } from './post-photo.entity';
import { QuotePostEntity } from './post-quote.entity';
import { TextPostEntity } from './post-text.entity';
import { VideoPostEntity } from './post-video.entity';

export type PostContentEntity = LinkPostEntity | PhotoPostEntity | QuotePostEntity | TextPostEntity | VideoPostEntity;
