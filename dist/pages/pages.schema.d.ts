import { Document } from 'mongoose';
import { Diff } from './diff.schema';
import { Comment } from './comment.schema';
export declare type PageDocument = Page & Document;
export declare class Page {
    title: string;
    logoUrl: string;
    status: number;
    version: number;
    content: string;
    diff: Diff[];
    comment: Comment[];
}
export declare const PageSchema: import("mongoose").Schema<Document<Page, any, any>, import("mongoose").Model<Document<Page, any, any>, any, any, any>, {}>;
