import { PartialType } from '@nestjs/swagger';
import { Users, UsersSchema } from '../users.schema';

export class UsersRequestDto extends PartialType(Users) {}
