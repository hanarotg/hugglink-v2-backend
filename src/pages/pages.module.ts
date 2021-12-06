import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PageController } from './pages.controller';
import { Page, PageSchema } from './pages.schema';
import { PageService } from './pages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
