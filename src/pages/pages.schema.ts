import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Document } from 'mongoose';

import { Diff, DiffSchema } from './diff.schema';
import { Comment, CommentSchema } from './comment.schema';

export type PageDocument = Page & Document;

@Schema()
export class Page {
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop()
  @IsUrl()
  logoUrl: string;

  @Prop()
  @IsNumber()
  status: number;

  @Prop()
  @IsNumber()
  version: number;

  @Prop()
  @IsString()
  content: string;

  @Prop({ type: [DiffSchema] })
  diff: Diff[];

  @Prop({ type: [CommentSchema] })
  comment: Comment[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
