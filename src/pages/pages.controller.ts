import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Req,
  Body,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { PageService } from './pages.service';
import { Express, Request } from 'express';

@Controller('pages')
export class PageController {
  constructor(private readonly PageService: PageService) {}

  // 페이지 정보
  @Get(':title')
  getPage(@Param('title') title: string) {
    return this.PageService.getPage(title);
  }

  // 페이지 생성
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  createPage(@Body() body: any) {
    return this.PageService.createPage(body.title);
  }

  // 페이지 수정
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  updatePage(
    @Param('id') id: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.PageService.updatePage(id, body, file);
  }

  // 페이지 - 히스토리 정보
  @Get(':title/history')
  getPageHistory(@Param('title') title: string) {
    return this.PageService.getPageHistory(title);
  }

  // 페이지 - 리스트 정보
  @Get('list/:page')
  listPage(@Param('page') page: number, @Query() query: Request['query']) {
    return this.PageService.listPage(page, query);
  }
}
