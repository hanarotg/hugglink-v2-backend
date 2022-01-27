import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString, IsNumber } from 'class-validator';

@Schema()
export class Comment {
  @Prop()
  @IsDate()
  date: Date;

  @Prop()
  @IsString()
  author: string;

  @Prop()
  @IsString()
  comment: string;

  @Prop()
  @IsNumber()
  status: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
