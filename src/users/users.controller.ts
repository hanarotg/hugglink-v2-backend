import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Res,
  Req,
  UseInterceptors,
  ConsoleLogger,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response, Request, request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // JWT 검증
  @Get()
  async authenticateUser(@Req() request: Request) {
    return this.UsersService.authenticateUser(request);
  }

  // 로그인
  @Post('login')
  @UseInterceptors(AnyFilesInterceptor())
  async loginUser(
    @Body() body,
    @Res({ passthrough: true }) response: Response
  ) {
    const jwt = await this.UsersService.loginUser(body);
    // 실서버에서는 secure : true 옵션 추가
    response.cookie('jwt', jwt, { httpOnly: true });

    return jwt;
  }

  // 로그아웃
  @Post('logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    // console.log(request.cookies['jwt']);
    response.clearCookie('jwt', { httpOnly: true });
    return;
  }

  // 회원가입
  @Post('signup')
  @UseInterceptors(AnyFilesInterceptor())
  signupUser(@Body() body: any) {
    return this.UsersService.signupUser(body);
  }
}
