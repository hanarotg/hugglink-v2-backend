import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString, IsObject } from 'class-validator';

@Schema()
export class Diff {
  @Prop()
  @IsDate()
  date: Date;

  @Prop()
  @IsString()
  author: string;

  @Prop({ type: Object })
  diff: Object;
}

export const DiffSchema = SchemaFactory.createForClass(Diff);
