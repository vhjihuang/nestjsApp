import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  ParseIntPipe,
  Patch, 
  Post,
  ValidationPipe
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

import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostService } from '../services/post.service';

@Controller('posts')
// @Controller('post')
export class PostController {
  constructor(private postService: PostService) {

  }
  @Get()
  async index() {
    return this.postService.findAll();
    // return posts;
  }

  @Get(':id')
  async show(@Param('id', new ParseIntPipe()) id: number) {

    return this.postService.findOne(id);
    /** const post = posts.find(v => v.id === Number(id));
    if (isNil(post)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    return post;
    */
  }


  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['create']
      })
    )
    data: CreatePostDto
  ) {

    return this.postService.create(data);
    /**
    const newPost: PostEntity = {
      id: Math.max(...posts.map(v => v.id +1 )),
      ...data
    };
    posts.push(newPost);
    return newPost;
     */
  }

  @Patch()
  async update(@Body(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      validationError: { target: false },
      groups: ['update']
    })
  ) data: UpdatePostDto ){
    return this.postService.update(data);

    /**
    let toUpdate = posts.find(v => v.id === Number(id));
    if (isNil(toUpdate)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    toUpdate = { ...toUpdate, ...data };
    posts = posts.map(v => v.id === Number(id) ? toUpdate : v);
    return toUpdate;
    */
  }


  @Delete(':id') 
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.delete(id);
    /**
    const toDelete = posts.find(v => v.id === Number(id));
    if (isNil(toDelete)) throw new NotAcceptableException(`the post with id ${id} not exits!`)
    posts = posts.filter(v => v.id !== Number(id));
    return toDelete;
     */
  }
}
