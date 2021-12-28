import { Model } from 'mongoose';
import { Page, PageDocument } from './pages.schema';
import { Request } from 'express';
export declare class PageService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    getPage(title: string): Promise<Page>;
    createPage(title: string): Promise<any>;
    updatePage(id: string, body: any, file: any): Promise<Page & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    listPage(page: number, query: Request['query']): Promise<Page[]>;
    uploadImage(id: string, file: any): Promise<unknown>;
}
