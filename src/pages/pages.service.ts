import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as AWS from 'aws-sdk';

import { Page, PageDocument } from './pages.schema';
import { Request } from 'express';
import * as diff from 'diff';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  // 페이지 정보 가져오기
  async getPage(title: string): Promise<Page> {
    return await this.pageModel.findOne({ title: title }).exec();
  }

  // 페이지 생성
  async createPage(title: string): Promise<any> {
    // 동명의 페이지 존재여부 확인
    const isPageExist = await this.pageModel.exists({ title: title });
    if (isPageExist) {
      throw new HttpException('존재하는 동명의 페이지가 있습니다.', 400);
    }

    // 페이지 생성
    const page = { title: title, version: 1 };
    return await this.pageModel.create(page);
  }

  // 페이지 정보 갱신
  async updatePage(id: string, body: any, file: any) {
    // 로고 이미지를 수정하였을 때
    if (file != undefined) {
      const imageUrl = await this.uploadImage(id, file);
      return await this.pageModel.findByIdAndUpdate(id, {
        $set: { content: body.content, logoUrl: imageUrl },
      });
    }

    // diff 알고리즘 적용, Patch 생성
    const page = await this.pageModel.findById(id);
    const diffPatch = diff.structuredPatch(
      page.version,
      page.version + 1,
      page.content,
      body.content
    );
    page.diff.push({
      date: new Date(),
      diff: diffPatch,
      author: 'anonymous',
    });
    page.save();

    // 업데이트
    return await this.pageModel.findByIdAndUpdate(id, {
      $set: { content: body.content, version: page.version + 1 },
    });
  }

  // 페이지 역사 가져오기
  async getPageHistory(title: string): Promise<any> {
    // 페이지 정보 가져오기
    const page = await this.pageModel.findOne({ title: title }).exec();
    return page.diff;
  }

  // 페이지 검색 및 리스팅
  async listPage(page: number, query: Request['query']): Promise<Page[]> {
    return await this.pageModel
      .find({ title: { $regex: `${query.title ? query.title : ''}` } })
      .select('title')
      .skip((page - 1) * 10)
      .exec();
  }

  // 이미지 업로드 함수
  async uploadImage(id: string, file: any) {
    // AWS 버킷 접속
    AWS.config.update({
      accessKeyId: process.env.S3_MAIN_ACCESS_KEY,
      secretAccessKey: process.env.S3_MAIN_SECRET_KEY,
      region: process.env.S3_MAIN_REGION,
    });
    const s3 = new AWS.S3();
    return new Promise((resolve, reject) => {
      const mimetypeAllowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
      // 이미지 형식이 png 또는 jpg 인지 확인
      if (!mimetypeAllowed.includes(file.mimetype)) {
        throw new HttpException(
          '지원하지 않는 이미지 형식입니다. png또는 jpg 파일로 다시 시도해보세요',
          404
        );
      }

      // 조잡하지만 임시방편으로
      let type = 'png';
      if (file.mimetype == 'image/svg+xml') {
        type = 'svg';
      }

      s3.upload(
        {
          Bucket: process.env.S3_MAIN_BUCKET_NAME,
          Key: `pages/${id}/logo.${type}`,
          ContentType: file.mimetype,
          Body: Buffer.from(file.buffer, 'binary'),
        },
        (error, data) => {
          if (error) {
            throw new HttpException(
              '파일을 업로드 할 수 없습니다. 관리자에게 문의하세요.',
              401
            );
          }
          resolve(data.Location);
        }
      );
    });
  }
}
