import { Body, Req, Controller, HttpStatus,
  Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, PostMessages, PostPath, PostsError } from './post.constant';
import { PostRdo } from './rdo/post.rdo';
import {
  CreateLinkPostDto, CreatePhotoPostDto,
  CreateQuotePostDto, CreateTextPostDto, CreateVideoPostDto,
  UpdateLinkPostDto, UpdatePhotoPostDto,
  UpdateQuotePostDto, UpdateTextPostDto, UpdateVideoPostDto, CreatePostContentDto, UpdatePostContentDto
} from '@project/shared/shared-dto';
import { adaptRdoPost } from '../../../../../libs/util/util-core/src/lib/adapt-rdo-post';
import { CreatePostValidationPipe } from './pipes/create-post-validation.pipe';
import { UpdatePostValidationPipe } from './pipes/update-post-validation.pipe';
import { JwtAuthGuard } from '@project/util/util-core';
import { TypePostValidationPipe } from './pipes/type-post-validation.pipe';
import { RequestWithUserPayload } from '@project/shared/app-types';


@ApiTags(API_TAG_NAME)
@ApiExtraModels(CreateLinkPostDto, CreatePhotoPostDto, CreateQuotePostDto,
  CreateTextPostDto,CreateVideoPostDto, UpdateLinkPostDto,
  UpdatePhotoPostDto, UpdateQuotePostDto, UpdateTextPostDto,
  UpdateVideoPostDto)
@Controller(PostPath.Main)
export class PostController {
  constructor(
    private readonly postsService: PostService
  ) { }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostMessages.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post(PostPath.Add)
  public async create(
    @Req() { user }: RequestWithUserPayload,
    @Body(TypePostValidationPipe, CreatePostValidationPipe)
    dto: CreatePostContentDto) {
    const userId = user.sub;
    const post = await this.postsService.create(dto, userId);
    return adaptRdoPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(PostPath.Id)
  public async update(@Req() { user }: RequestWithUserPayload,
    @Param('id') id: number,
    @Body(TypePostValidationPipe, UpdatePostValidationPipe)
    dto: UpdatePostContentDto) {
    const userId = user.sub;
    const post = await this.postsService.update(id, dto, userId);
    return adaptRdoPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostMessages.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Post(PostPath.Respost)
  public async repost(@Param('id') id: number,
    @Req() { user }: RequestWithUserPayload) {
    const userId = user.sub;
    const post = await this.postsService.repost(id, userId);
    return adaptRdoPost(post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostMessages.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PostsError.Delete
  })
  @UseGuards(JwtAuthGuard)
  @Delete(PostPath.Id)
  public async delete(@Param('id') id: number,
    @Req() { user }: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.postsService.remove(id, userId);
  }
}
