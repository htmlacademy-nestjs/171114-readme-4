import { CreateLinkPostDto } from './post-link.dto';
import { CreatePhotoPostDto } from './post-photo.dto';
import { CreateQuotePostDto } from './post-quote.dto';
import { CreateTextPostDto } from './post-text.dto';
import { CreateVideoPostDto } from './post-video.dto';

export type CreatePostContentDto = CreateLinkPostDto | CreatePhotoPostDto | CreateQuotePostDto | CreateTextPostDto | CreateVideoPostDto;
