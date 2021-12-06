import { HttpException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { Users, UsersDocument } from './users.schema';
import { UsersRequestDto } from './dto/users.request.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly JwtService: JwtService
  ) {}

  // JWT 검증
  async authenticateUser(request: Request): Promise<string | any> {
    // 쿠키 존재 유무 확인
    const cookie = await request.cookies['jwt'];
    if (!cookie) {
      throw new HttpException('로그인 인증 정보를 찾을 수 없습니다.', 404);
    }

    // JWT에서 회원 이메일 추출
    const data = await this.JwtService.verifyAsync(cookie);
    if (!data) {
      throw new HttpException(
        'JWT를 인증하는 과정에서 문제가 발생했습니다.',
        404
      );
    }

    return data.id;
  }

  // 로그인
  async loginUser(body: any): Promise<string> {
    const user = await this.usersModel.findOne({ email: body.email });

    // 존재하지 않는 경우
    if (user == undefined) {
      throw new HttpException('존재하지 않는 회원입니다.', 400);
    }

    // 비밀번호 일치 여부 판단
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 401);
    }

    // jwt 발급
    const jwt = await this.JwtService.signAsync({ id: body.email });

    return jwt;
  }

  // 유저 생성
  async signupUser(body: UsersRequestDto): Promise<any> {
    // 중복 이메일 가입자 여부 확인
    const isUserExist = await this.usersModel.exists({ email: body.email });
    if (isUserExist) {
      throw new HttpException('이미 가입한 이메일입니다.', 400);
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const query = {
      email: body.email,
      password: hashedPassword,
      status: 1,
    };

    return await this.usersModel.create(query);
  }
}
