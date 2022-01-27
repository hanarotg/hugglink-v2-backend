"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const diff_schema_1 = require("./diff.schema");
const pages_controller_1 = require("./pages.controller");
const pages_schema_1 = require("./pages.schema");
const pages_service_1 = require("./pages.service");
let PageModule = class PageModule {
};
PageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: pages_schema_1.Page.name, schema: pages_schema_1.PageSchema },
                { name: diff_schema_1.Diff.name, schema: diff_schema_1.DiffSchema },
            ]),
        ],
        controllers: [pages_controller_1.PageController],
        providers: [pages_service_1.PageService],
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=pages.module.js.map