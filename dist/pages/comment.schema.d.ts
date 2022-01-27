/// <reference types="mongoose" />
export declare class Comment {
    date: Date;
    author: string;
    comment: string;
    status: number;
}
export declare const CommentSchema: import("mongoose").Schema<import("mongoose").Document<Comment, any, any>, import("mongoose").Model<import("mongoose").Document<Comment, any, any>, any, any, any>, {}>;
