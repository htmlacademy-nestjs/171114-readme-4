import { Req, Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { API_TAG_NAME, BlogError, BlogMessages, BlogPath } from './blog.constant';
import { PostQuery, SearchPostsQuery } from '@project/shared/shared-queries';
import { JwtAuthGuard } from '@project/util/util-core';
import { NotifyService } from '../notify/notify.service';
import { RequestWithUserPayload } from '@project/shared/app-types';
import { adaptRdoPost } from '../../../../../libs/util/util-core/src/lib/adapt-rdo-post';

@ApiTags(API_TAG_NAME)
@Controller(BlogPath.Main)
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly notifyService: NotifyService
  ) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogError.EmptyList
  })
  @Get()
  public async show(@Query() query:PostQuery) {
    const posts = await this.blogService.showAll(query);
    return posts.map((post) => adaptRdoPost(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @Get(BlogPath.Search)
  public async searchByTitle(@Query() query:SearchPostsQuery) {
    const posts = await this.blogService.searchByTitle(query);
    return posts.map((post) => adaptRdoPost(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogError.EmptyList
  })
  @UseGuards(JwtAuthGuard)
  @Get(BlogPath.Drafts)
  async showDrafts(@Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const posts = await this.blogService.showDrafts(userId);
    return posts.map((post) => adaptRdoPost(post) );
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description:BlogMessages.NewsSent
  })
  @UseGuards(JwtAuthGuard)
  @Get(BlogPath.SendNewsletter)
  public async sendNews(@Req() {user}: RequestWithUserPayload) {
    const {email, sub} = user;
    const posts = await this.blogService.getPosts()
    this.notifyService.sendNewsletter({email, posts, id:sub});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogError.PostNotFound
  })
  @Get(BlogPath.Id)
  public async showById(@Param('id') id: number) {
    const publication = await this.blogService.findByPostId(id);
    return adaptRdoPost(publication);
  }
}
