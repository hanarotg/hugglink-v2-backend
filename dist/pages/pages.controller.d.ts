/// <reference types="multer" />
import { PageService } from './pages.service';
import { PageRequestDto } from './dto/pages.request.dto';
import { Request } from 'express';
export declare class PageController {
    private readonly PageService;
    constructor(PageService: PageService);
    getPage(title: string): Promise<PageRequestDto>;
    createPage(body: any): Promise<any>;
    updatePage(id: string, body: any, file: Express.Multer.File): Promise<import("./pages.schema").Page & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    listPage(page: number, query: Request['query']): Promise<PageRequestDto[]>;
}
