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
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { PageService } from './pages.service';
import { PageRequestDto } from './dto/pages.request.dto';
import { Express } from 'express';

@Controller('pages')
export class PageController {
  constructor(private readonly PageService: PageService) {}

  @Get(':title')
  getPage(@Param('title') title: string): Promise<PageRequestDto> {
    return this.PageService.getPage(title);
  }

  @Get('search/:title')
  searchPage(@Param('title') title: string) {
    return this.PageService.searchPage(title);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  createPage(@Body() body: any) {
    console.log('생성을 원한다', body);
    return this.PageService.createPage(body.title);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  updatePage(
    @Param('id') id: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.PageService.updatePage(id, body, file);
  }

  @Get('list/:query')
  listPage(): Promise<PageRequestDto[]> {
    return this.PageService.listPage();
  }
}
