import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';

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
  async createPage(page: PageRequestDto): Promise<Page> {
    // 동명의 페이지 존재여부 확인
    const isPageExist = await this.pageModel.exists({ title: page.title });
    if (isPageExist) {
      throw new HttpException('존재하는 동명의 페이지가 있습니다.', 400);
    }

    // 페이지 생성
    return await this.pageModel.create(page);
  }

  // 페이지 정보 갱신
  async updatePage(id, body): Promise<Page> {
    return await this.pageModel.findByIdAndUpdate(id, {
      $set: { content: body.content },
    });
  }

  // 페이지 정렬
  async listPage(): Promise<Page[]> {
    return await this.pageModel.find({}, 'title').exec();
  }
}
