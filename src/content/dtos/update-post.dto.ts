import { Injectable } from '@nestjs/common'

import { PartialType } from '@nestjs/swagger'
import { IsDefined, IsNumber } from 'class-validator'

import { CreatePostDto } from './create-post.dto'

@Injectable()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber(undefined, { groups: ['update'], message: 'ID must be a number' })
  @IsDefined({ groups: ['update'], message: 'ID is required' })
  id!: number
}
