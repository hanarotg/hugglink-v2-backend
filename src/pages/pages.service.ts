import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as AWS from 'aws-sdk';

import { Page, PageDocument } from './pages.schema';
import { PageRequestDto } from './dto/pages.request.dto';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  // 페이지 정보 가져오기
  async getPage(title: string): Promise<Page> {
    return await this.pageModel.findOne({ title: title }).exec();
  }

  // 페이지 검색
  // 이부분 이해가 잘 안간다.
  async searchPage(title: string): Promise<object> {
    const query = new RegExp(title);
    return await this.pageModel
      .find({ title: query }, 'title')
      .limit(10)
      .exec();
  }

  // 페이지 생성
  async createPage(title: string): Promise<Page> {
    // 동명의 페이지 존재여부 확인
    const isPageExist = await this.pageModel.exists({ title: title });
    if (isPageExist) {
      throw new HttpException('존재하는 동명의 페이지가 있습니다.', 400);
    }

    // 페이지 생성
    return await this.pageModel.create(title);
  }

  // 페이지 정보 갱신
  async updatePage(id: string, body: any, file: any) {
    // 로고 이미지를 수정하였을 때
    if (file != undefined) {
      const image: any = await this.uploadImage(id, file);
      return await this.pageModel.findByIdAndUpdate(id, {
        $set: { content: body.content, logoUrl: image.Location },
      });
    }

    // 수정하지 않은 경우
    return await this.pageModel.findByIdAndUpdate(id, {
      $set: { content: body.content },
    });
  }

  // 페이지 정렬
  async listPage(): Promise<Page[]> {
    return await this.pageModel.find({}, 'title').exec();
  }

  // 이미지 업로드 함수
  async uploadImage(title: string, file: any) {
    return new Promise((resolve, reject) => {
      // AWS 버킷 접속
      AWS.config.update({
        accessKeyId: process.env.S3_MAIN_ACCESS_KEY,
        secretAccessKey: process.env.S3_MAIN_SECRET_KEY,
        region: process.env.S3_MAIN_REGION,
      });
      const s3 = new AWS.S3();

      // 이미지 형식이 png 또는 jpg 인지 확인
      if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
        throw new HttpException(
          '지원하지 않는 이미지 형식입니다. png또는 jpg 파일로 다시 시도해보세요',
          404
        );
      }

      s3.upload(
        {
          Bucket: process.env.S3_MAIN_BUCKET_NAME,
          Key: `pages/${title}/logo.png`,
          Body: Buffer.from(file.buffer, 'binary'),
        },
        (error, data) => {
          if (error) {
            throw new HttpException(
              '파일을 업로드 할 수 없습니다. 관리자에게 문의하세요.',
              401
            );
          }
          resolve(data);
        }
      );
    });
  }
}
