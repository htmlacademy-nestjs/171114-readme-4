import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, adaptRdoPost } from '../../../../../libs/util/util-core/src';
import { API_TAG_NAME, FeedError, FeedMessages, FeedPath } from './feed.constsant';
import { Controller, Get, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SearchPostsQuery } from '@project/shared/shared-queries';
import { FeedService } from './feed.service';

@ApiTags(API_TAG_NAME)
@Controller(FeedPath.Main)
export class FeedController {
  constructor(
    private readonly feedService: FeedService
  ) {}
  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FeedError.EmptyList
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  public async show(@Req() {user}) {
    const posts = await this.feedService.findFeed(user._id);
    return posts.map((post) => adaptRdoPost(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.ShowAll
  })
  @UseGuards(JwtAuthGuard)
  @Get(FeedPath.Search)
  public async searchByTitle(@Query() query:SearchPostsQuery) {
    const posts = await this.feedService.searchByTitle(query);
    return posts.map((post) => adaptRdoPost(post) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FeedError.PostNotFound
  })
  @UseGuards(JwtAuthGuard)
  @Get(FeedPath.Id)
  public async showById(@Param('id') id: number) {
    const post = await this.feedService.findByPostId(id);
    return adaptRdoPost(post);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.UserDetails
  })
  @UseGuards(JwtAuthGuard)
  @Get(FeedPath.Details)
  public async getUserDetails(@Param('id') id: string) {
    return await this.feedService.getUserDetails(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.FollowUser
  })
  @UseGuards(JwtAuthGuard)
  @Get(FeedPath.Follow)
  public async followUser(@Req() {user}, @Param('id') id: string) {
    return await this.feedService.followUser(user._id, id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedMessages.FollowUser
  })
  @UseGuards(JwtAuthGuard)
  @Get(FeedPath.Unfollow)
  public async unfollowUser(@Req() {user}, @Param('id') id: string) {
    return await this.feedService.unfollowUser(user._id, id);
  }
}
