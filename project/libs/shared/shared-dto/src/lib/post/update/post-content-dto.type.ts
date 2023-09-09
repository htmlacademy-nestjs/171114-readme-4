import { UpdateLinkPostDto } from './post-link.dto';
import { UpdatePhotoPostDto } from './post-photo.dto';
import { UpdateQuotePostDto } from './post-quote.dto';
import { UpdateTextPostDto } from './post-text.dto';
import { UpdateVideoPostDto } from './post-video.dto';

export type UpdatePostContentDto = UpdateLinkPostDto | UpdatePhotoPostDto | UpdateQuotePostDto | UpdateTextPostDto | UpdateVideoPostDto;
