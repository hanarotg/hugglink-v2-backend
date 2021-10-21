import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { PageController } from './pages.controller';
import { Page, PageSchema } from './pages.schema';
import { PageService } from './pages.service';

@Module({
    imports: [MongooseModule.forFeature([{ name : Page.name, schema : PageSchema}]), 
            MulterModule.register({ dest : './upload'})],
    controllers: [PageController],
    providers: [PageService],
})

export class PageModule {}
