import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PageService } from './pages.service';
import { PageRequestDto } from './dto/pages.request.dto';

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
  createPage(@Body() body: PageRequestDto) {
    return this.PageService.createPage(body);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  updatePage(
    @Param('id') id: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    // return this.PageService.updatePage(id, body);
  }

  @Get('list/:query')
  listPage(): Promise<PageRequestDto[]> {
    return this.PageService.listPage();
  }
}
