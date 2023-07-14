"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/db"));
const utils_1 = require("../utils");
const on_stop_typing_1 = __importDefault(require("./on_stop_typing"));
const index_1 = __importDefault(require("../notify/index"));
const index_2 = require("../../../utils/index");
const index_3 = require("../../utils/index");
const type = (socket, data) => {
    if (typeof data !== 'object' || !('user_id' in data) || !('to_id' in data))
        return (0, index_3.socketEmit)(socket, 'error', 400);
    (0, index_2.auth_user)(socket, data, () => {
        const identyfier = data['user_id'] + '-' + data['to_id'];
        if (utils_1.typing[identyfier] === undefined) {
            utils_1.typing[identyfier] = { 'func': (0, on_stop_typing_1.default)(data, identyfier) };
            db_1.default.run(`INSERT INTO typing(user, to_user) VALUES(?, ?);`, [data['user_id'], data['to_id']], () => {
                (0, index_1.default)(data['user_id'], data['to_id']);
            });
        }
        (0, utils_1.runTimer)(identyfier);
    });
};
function typing() {
    (0, index_3.setEvent)('type', type);
}
exports.default = typing;
//# sourceMappingURL=typing.js.map