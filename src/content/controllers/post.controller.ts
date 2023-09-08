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


  @Post()
  async store() {
    const newPost: PostEntity = {
      id: Math.max(...posts.map(v => v.id +1 )),
      title: '新增文章标题',
      body: '新增文章内容'
    };
    posts.push(newPost);
    return newPost;
  }

  @Patch(':id')
  async update(@Param('id') id: number) {
    let toUpdate = posts.find(v => v.id === Number(id));
    if (isNil(toUpdate)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    toUpdate = { ...toUpdate, title: '更新文章标题' };
    posts = posts.map(v => v.id === Number(id) ? toUpdate : v);
    return toUpdate;
  }


  @Delete(':id') 
  async delete(@Param('id') id: number) {
    const toDelete = posts.find(v => v.id === Number(id));
    if (isNil(toDelete)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    posts = posts.filter(v => v.id !== Number(id));
    return toDelete;
  }
}
