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
exports.PageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AWS = require("aws-sdk");
const pages_schema_1 = require("./pages.schema");
let PageService = class PageService {
    constructor(pageModel) {
        this.pageModel = pageModel;
    }
    async getPage(title) {
        return await this.pageModel.findOne({ title: title }).exec();
    }
    async searchPage(title) {
        const query = new RegExp(title);
        return await this.pageModel
            .find({ title: query }, 'title')
            .limit(10)
            .exec();
    }
    async createPage(title) {
        const isPageExist = await this.pageModel.exists({ title: title });
        if (isPageExist) {
            throw new common_1.HttpException('존재하는 동명의 페이지가 있습니다.', 400);
        }
        return await this.pageModel.create(title);
    }
    async updatePage(id, body, file) {
        if (file != undefined) {
            const image = await this.uploadImage(id, file);
            return await this.pageModel.findByIdAndUpdate(id, {
                $set: { content: body.content, logoUrl: image.Location },
            });
        }
        return await this.pageModel.findByIdAndUpdate(id, {
            $set: { content: body.content },
        });
    }
    async listPage() {
        return await this.pageModel.find({}, 'title').exec();
    }
    async uploadImage(title, file) {
        return new Promise((resolve, reject) => {
            AWS.config.update({
                accessKeyId: process.env.S3_MAIN_ACCESS_KEY,
                secretAccessKey: process.env.S3_MAIN_SECRET_KEY,
                region: process.env.S3_MAIN_REGION,
            });
            const s3 = new AWS.S3();
            if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
                throw new common_1.HttpException('지원하지 않는 이미지 형식입니다. png또는 jpg 파일로 다시 시도해보세요', 404);
            }
            s3.upload({
                Bucket: process.env.S3_MAIN_BUCKET_NAME,
                Key: `pages/${title}/logo.png`,
                Body: Buffer.from(file.buffer, 'binary'),
            }, (error, data) => {
                if (error) {
                    throw new common_1.HttpException('파일을 업로드 할 수 없습니다. 관리자에게 문의하세요.', 401);
                }
                resolve(data);
            });
        });
    }
};
PageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pages_schema_1.Page.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=pages.service.js.map