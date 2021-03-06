"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSchema = exports.Page = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const diff_schema_1 = require("./diff.schema");
const comment_schema_1 = require("./comment.schema");
let Page = class Page {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Page.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], Page.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Page.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Page.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Page.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [diff_schema_1.DiffSchema] }),
    __metadata("design:type", Array)
], Page.prototype, "diff", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [comment_schema_1.CommentSchema] }),
    __metadata("design:type", Array)
], Page.prototype, "comment", void 0);
Page = __decorate([
    (0, mongoose_1.Schema)()
], Page);
exports.Page = Page;
exports.PageSchema = mongoose_1.SchemaFactory.createForClass(Page);
//# sourceMappingURL=pages.schema.js.map