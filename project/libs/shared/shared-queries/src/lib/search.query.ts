import { IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultPostsLimit } from './query.constant';

export class SearchPostsQuery {
  @Transform(({value}) => decodeURIComponent(value))
  @IsString()
  public title: string;

  @IsInt()
  @IsOptional()
  public limit: number = DefaultPostsLimit.Search;
}
