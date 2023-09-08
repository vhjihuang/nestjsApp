import {
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Patch, 
  Post
} from '@nestjs/common';

import { isNil } from 'loadsh';

import { PostEntity } from '../types';
import { throws } from 'assert';

let posts: PostEntity[] = [
  { title: '第一篇文章标题', body: '第一篇文章内容' },
  { title: '第二篇文章标题', body: '第二篇文章内容' },
  { title: '第三篇文章标题', body: '第三篇文章内容' },
  { title: '第四篇文章标题', body: '第四篇文章内容' },
  { title: '第五篇文章标题', body: '第五篇文章内容' },
].map((v, id) => ({ ...v, id }));

@Controller('posts')
@Controller('post')
export class PostController {
  @Get()
  async index() {
    return posts;
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    const post = posts.find(v => v.id === Number(id));
    if (isNil(post)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    return post;
  }
}
