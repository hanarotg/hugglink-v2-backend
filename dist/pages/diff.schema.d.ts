/// <reference types="mongoose" />
export declare class Diff {
    date: Date;
    author: string;
    diff: Object;
}
export declare const DiffSchema: import("mongoose").Schema<import("mongoose").Document<Diff, any, any>, import("mongoose").Model<import("mongoose").Document<Diff, any, any>, any, any, any>, {}>;
