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
exports.toUserDto = exports.UserGetParamsDto = exports.UserDto = exports.UserUpdateDto = exports.UserCreateDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
class UserCreateDto {
    name;
    address;
    document;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "document", void 0);
exports.UserCreateDto = UserCreateDto;
class UserUpdateDto {
    name;
    address;
    document;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "document", void 0);
exports.UserUpdateDto = UserUpdateDto;
class UserDto extends user_entity_1.User {
}
exports.UserDto = UserDto;
class UserGetParamsDto {
    id;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserGetParamsDto.prototype, "id", void 0);
exports.UserGetParamsDto = UserGetParamsDto;
const toUserDto = (entity) => {
    return {
        ...entity
    };
};
exports.toUserDto = toUserDto;
//# sourceMappingURL=user.dto.js.map