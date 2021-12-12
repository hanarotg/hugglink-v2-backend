"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_schema_1 = require("../users.schema");
class UsersRequestDto extends (0, swagger_1.PartialType)(users_schema_1.Users) {
}
exports.UsersRequestDto = UsersRequestDto;
//# sourceMappingURL=users.request.dto.js.map