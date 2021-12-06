import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true })
  @IsNumber()
  status: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
