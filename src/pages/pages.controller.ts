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
import { PageRequestDto } from './dto/pages.request.dto';
import { Express, Request } from 'express';

@Controller('pages')
export class PageController {
  constructor(private readonly PageService: PageService) {}

  @Get(':title')
  getPage(@Param('title') title: string): Promise<PageRequestDto> {
    return this.PageService.getPage(title);
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  createPage(@Body() body: any) {
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

  @Get('list/:page')
  listPage(
    @Param('page') page: number,
    @Query() query: Request['query']
  ): Promise<PageRequestDto[]> {
    return this.PageService.listPage(page, query);
  }
}
