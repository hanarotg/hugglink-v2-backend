"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const users_schema_1 = require("./users.schema");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(usersModel, JwtService) {
        this.usersModel = usersModel;
        this.JwtService = JwtService;
    }
    async authenticateUser(request) {
        const cookie = await request.cookies['jwt'];
        if (!cookie) {
            throw new common_1.HttpException('로그인 인증 정보를 찾을 수 없습니다.', 404);
        }
        const data = await this.JwtService.verifyAsync(cookie);
        if (!data) {
            throw new common_1.HttpException('JWT를 인증하는 과정에서 문제가 발생했습니다.', 404);
        }
        return data.id;
    }
    async loginUser(body) {
        const user = await this.usersModel.findOne({ email: body.email });
        if (user == undefined) {
            throw new common_1.HttpException('존재하지 않는 회원입니다.', 400);
        }
        const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.HttpException('비밀번호가 일치하지 않습니다.', 401);
        }
        const jwt = await this.JwtService.signAsync({ id: body.email });
        return jwt;
    }
    async signupUser(body) {
        const isUserExist = await this.usersModel.exists({ email: body.email });
        if (isUserExist) {
            throw new common_1.HttpException('이미 가입한 이메일입니다.', 400);
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const query = {
            email: body.email,
            password: hashedPassword,
            status: 1,
        };
        return await this.usersModel.create(query);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map