import { Response, Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    authenticateUser(request: Request): Promise<any>;
    loginUser(body: any, response: Response): Promise<string>;
    logout(request: Request, response: Response): void;
    signupUser(body: any): Promise<any>;
}
