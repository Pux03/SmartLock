"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLockerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_locker_dto_1 = require("./create-locker.dto");
class UpdateLockerDto extends (0, mapped_types_1.PartialType)(create_locker_dto_1.CreateLockerDto) {
}
exports.UpdateLockerDto = UpdateLockerDto;
//# sourceMappingURL=update-locker.dto.js.map