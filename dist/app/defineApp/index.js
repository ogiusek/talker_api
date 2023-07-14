"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./auth/index"));
const index_2 = __importDefault(require("./block_user/index"));
const index_3 = __importDefault(require("./contacts/index"));
const index_4 = __importDefault(require("./messeages/index"));
function defineApp(app) {
    (0, index_1.default)(app);
    (0, index_2.default)(app);
    (0, index_4.default)(app);
    (0, index_3.default)(app);
}
;
exports.default = defineApp;
//# sourceMappingURL=index.js.map