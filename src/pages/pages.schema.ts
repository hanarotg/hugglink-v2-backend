import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Document } from 'mongoose';

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

  @Prop()
  comment: [];
}

export const PageSchema = SchemaFactory.createForClass(Page);
