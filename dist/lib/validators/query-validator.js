"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValidator = void 0;
var zod_1 = require("zod");
exports.QueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["name", "-name", "likes", "-likes"]).optional(),
    limit: zod_1.z.number().optional(),
    search: zod_1.z.string().optional(),
});
