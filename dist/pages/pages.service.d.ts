import { Model } from 'mongoose';
import { Page, PageDocument } from './pages.schema';
export declare class PageService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    getPage(title: string): Promise<Page>;
    searchPage(title: string): Promise<object>;
    createPage(title: string): Promise<any>;
    updatePage(id: string, body: any, file: any): Promise<Page & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    listPage(): Promise<Page[]>;
    uploadImage(title: string, file: any): Promise<unknown>;
}
