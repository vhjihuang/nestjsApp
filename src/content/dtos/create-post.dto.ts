import { Injectable } from '@nestjs/common';
import { MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

@Injectable()
export class CreatePostDto {
  @MaxLength( 255, {
    always: true,
    message: 'Title must be less than $constraint1 characters',
  })
  @IsNotEmpty({ groups:['create'],  message: 'Title is required' })
  @IsOptional({ groups:['update']})
  title!: string

  @IsNotEmpty({ groups:['create'],  message: 'Body is required' })
  @IsOptional({ groups:['update']})
  body!: string

  @MaxLength( 255, {
    always: true,
    message: 'Description must be less than $constraint1 characters',
  })
  @IsOptional({ always: true })
  summary?: string
}