/// <reference types="multer" />
/// <reference types="mongoose" />
import { PageService } from './pages.service';
import { PageRequestDto } from './dto/pages.request.dto';
export declare class PageController {
    private readonly PageService;
    constructor(PageService: PageService);
    getPage(title: string): Promise<PageRequestDto>;
    searchPage(title: string): Promise<object>;
    createPage(body: any): Promise<import("./pages.schema").Page>;
    updatePage(id: string, body: any, file: Express.Multer.File): Promise<import("./pages.schema").Page & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    listPage(): Promise<PageRequestDto[]>;
}
