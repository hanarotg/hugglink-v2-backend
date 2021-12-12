import { Model } from 'mongoose';
import { UsersDocument } from './users.schema';
import { UsersRequestDto } from './dto/users.request.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class UsersService {
    private usersModel;
    private readonly JwtService;
    constructor(usersModel: Model<UsersDocument>, JwtService: JwtService);
    authenticateUser(request: Request): Promise<string | any>;
    loginUser(body: any): Promise<string>;
    signupUser(body: UsersRequestDto): Promise<any>;
}
