"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AppError_1 = (0, tslib_1.__importDefault)(require("./AppError"));
class NotFoundError extends AppError_1.default {
    constructor(message) {
        super(20000, message);
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map