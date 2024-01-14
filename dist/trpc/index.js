"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var zod_1 = require("zod");
var query_validator_1 = require("../lib/validators/query-validator");
var get_payload_1 = require("../get-payload");
var auth_router_1 = require("./auth-router");
var trpc_1 = require("./trpc");
function formatWithLeadingZero(num) {
    return num < 10 ? "0" + num : num;
}
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    updatePlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        brideName: zod_1.z.string().optional(),
        groomName: zod_1.z.string().optional(),
        weddingDate: zod_1.z.string().optional(),
        venue: zod_1.z.string().optional(),
        agent: zod_1.z.string().optional(),
        bridal: zod_1.z.string().optional(),
        photovideo: zod_1.z.string().optional(),
        catering: zod_1.z.string().optional(),
        decor: zod_1.z.string().optional(),
        henna: zod_1.z.string().optional(),
        mua: zod_1.z.string().optional(),
        emcee: zod_1.z.string().optional(),
        honeymoon: zod_1.z.string().optional(),
        misc: zod_1.z.string().optional(),
    })).mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        if (!input.brideName) return [3 /*break*/, 3];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    brideName: input.brideName
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 3:
                        if (!input.groomName) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    groomName: input.groomName
                                }
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 5:
                        if (!input.weddingDate) return [3 /*break*/, 7];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    weddingDate: input.weddingDate
                                }
                            })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 7:
                        if (!input.venue) return [3 /*break*/, 9];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    venue: input.venue
                                }
                            })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 9:
                        if (!input.agent) return [3 /*break*/, 11];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    agent: input.agent
                                }
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 11:
                        if (!input.bridal) return [3 /*break*/, 13];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    bridal: input.bridal
                                }
                            })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 13:
                        if (!input.photovideo) return [3 /*break*/, 15];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    photovideo: input.photovideo
                                }
                            })];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 15:
                        if (!input.catering) return [3 /*break*/, 17];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    catering: input.catering
                                }
                            })];
                    case 16:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 17:
                        if (!input.decor) return [3 /*break*/, 19];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    decor: input.decor
                                }
                            })];
                    case 18:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 19:
                        if (!input.henna) return [3 /*break*/, 21];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    henna: input.henna
                                }
                            })];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 21:
                        if (!input.mua) return [3 /*break*/, 23];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    mua: input.mua
                                }
                            })];
                    case 22:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 23:
                        if (!input.emcee) return [3 /*break*/, 25];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    emcee: input.emcee
                                }
                            })];
                    case 24:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 25:
                        if (!input.honeymoon) return [3 /*break*/, 27];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    honeymoon: input.honeymoon
                                }
                            })];
                    case 26:
                        _b.sent();
                        return [3 /*break*/, 29];
                    case 27:
                        if (!input.misc) return [3 /*break*/, 29];
                        return [4 /*yield*/, payload.update({
                                collection: 'plans',
                                where: {
                                    id: { equals: input.id }
                                },
                                data: {
                                    misc: input.misc
                                }
                            })];
                    case 28:
                        _b.sent();
                        _b.label = 29;
                    case 29: return [2 /*return*/];
                }
            });
        });
    }),
    createPlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string()
    })).mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'plans',
                                data: {
                                    user: input.userId
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getPlan: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'plans',
                                where: {
                                    user: {
                                        equals: input.userId,
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getEnquiries12M: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, resultsArray, currentEnqData, accuEnqData, currentSSData, accuSSData, i, currentMonth, currentYear, followingMonth, followingYear, results1, results2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        resultsArray = [];
                        currentEnqData = 0;
                        accuEnqData = 0;
                        currentSSData = 0;
                        accuSSData = 0;
                        i = 12;
                        _b.label = 2;
                    case 2:
                        if (!(i > -1)) return [3 /*break*/, 6];
                        currentMonth = input.month - i;
                        currentYear = input.year;
                        followingMonth = currentMonth + 1;
                        followingYear = input.year;
                        if (currentMonth === 0) {
                            currentMonth = 12;
                            currentYear = currentYear - 1;
                        }
                        else if (currentMonth < 0) {
                            currentMonth = currentMonth + 12;
                            currentYear = currentYear - 1;
                            followingMonth = currentMonth + 1;
                            followingYear = currentYear;
                        }
                        if (followingMonth > 12) {
                            followingMonth = followingMonth - 12;
                            followingYear = followingYear + 1;
                        }
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendor: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z"))
                                    }
                                }
                            })];
                    case 3:
                        results1 = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendor: {
                                        equals: input.vendorId
                                    },
                                    source: { equals: 'Sarang Sayang' },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z"))
                                    }
                                }
                            })];
                    case 4:
                        results2 = _b.sent();
                        currentEnqData = results1.docs.length - accuEnqData;
                        currentSSData = results2.docs.length - accuSSData;
                        accuEnqData = accuEnqData + currentEnqData;
                        accuSSData = accuSSData + currentSSData;
                        resultsArray.push({
                            month: currentMonth,
                            year: currentYear,
                            data: currentEnqData,
                            ss: currentSSData
                        });
                        _b.label = 5;
                    case 5:
                        i = i - 1;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, resultsArray];
                }
            });
        });
    }),
    getVendorLikes12M: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, resultsArray, currentData, accuData, i, currentMonth, currentYear, followingMonth, followingYear, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        resultsArray = [];
                        currentData = 0;
                        accuData = 0;
                        i = 12;
                        _b.label = 2;
                    case 2:
                        if (!(i > -1)) return [3 /*break*/, 5];
                        currentMonth = input.month - i;
                        currentYear = input.year;
                        followingMonth = currentMonth + 1;
                        followingYear = input.year;
                        if (currentMonth === 0) {
                            currentMonth = 12;
                            currentYear = currentYear - 1;
                        }
                        else if (currentMonth < 0) {
                            currentMonth = currentMonth + 12;
                            currentYear = currentYear - 1;
                            followingMonth = currentMonth + 1;
                            followingYear = currentYear;
                        }
                        if (followingMonth > 12) {
                            followingMonth = followingMonth - 12;
                            followingYear = followingYear + 1;
                        }
                        return [4 /*yield*/, payload.find({
                                collection: 'likesArchive',
                                where: {
                                    vendor: { equals: input.vendorId },
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(currentYear, "-").concat(formatWithLeadingZero(currentMonth), "-01T00:00:00Z")),
                                        less_than: new Date("".concat(followingYear, "-").concat(formatWithLeadingZero(followingMonth), "-01T00:00:00Z"))
                                    }
                                }
                            })];
                    case 3:
                        results = _b.sent();
                        currentData = results.docs.length - accuData;
                        accuData = accuData + currentData;
                        resultsArray.push({
                            month: currentMonth,
                            year: currentYear,
                            data: currentData
                        });
                        _b.label = 4;
                    case 4:
                        i = i - 1;
                        return [3 /*break*/, 2];
                    case 5:
                        console.log(resultsArray);
                        return [2 /*return*/, resultsArray];
                }
            });
        });
    }),
    getSSLeadsThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12 ? (new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))) : (new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z")));
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendor: input.vendorId,
                                    source: 'Sarang Sayang',
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendorLikesThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12 ? (new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))) : (new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z")));
                        return [4 /*yield*/, payload.find({
                                collection: 'likes',
                                where: {
                                    vendor: input.vendorId,
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getEnquiriesThisMonth: trpc_1.publicProcedure
        .input(zod_1.z.object({
        year: zod_1.z.number(),
        month: zod_1.z.number(),
        vendorId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, ltDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        ltDate = input.month === 12 ? (new Date("".concat(input.year + 1, "-01-01T00:00:00Z"))) : (new Date("".concat(input.year, "-").concat(input.month + 1, "-01T00:00:00Z")));
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendorId: input.vendorId,
                                    createdAt: {
                                        greater_than_equal: new Date("".concat(input.year, "-").concat(input.month, "-01T00:00:00Z")),
                                        less_than: ltDate
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendUser: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendUserId: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'vendors',
                                where: {
                                    venduserid: {
                                        equals: input.vendUserId,
                                    }
                                },
                                limit: 1
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getVendorId: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'vendors',
                                where: {
                                    venduserid: {
                                        equals: input.userId,
                                    }
                                },
                                limit: 1
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLeads: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getSSLeads: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    },
                                    source: {
                                        equals: 'Sarang Sayang'
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contact: zod_1.z.string(),
        message: zod_1.z.string(),
        source: zod_1.z.string(),
        status: zod_1.z.string(),
        priority: zod_1.z.string(),
        remarks: zod_1.z.string(),
        vendorId: zod_1.z.string()
    })).mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'leads',
                                data: {
                                    name: input.name,
                                    email: input.email,
                                    contact: input.contact,
                                    message: input.message,
                                    source: input.source,
                                    status: input.status,
                                    priority: input.priority,
                                    remarks: input.remarks,
                                    vendor: input.vendorId,
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    removeLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        leadId: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: 'leads',
                                id: input.leadId
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'leads',
                                where: {
                                    id: {
                                        equals: input.id,
                                    }
                                },
                                limit: 1
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    updateLead: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        contact: zod_1.z.string(),
        message: zod_1.z.string(),
        source: zod_1.z.string(),
        status: zod_1.z.string(),
        priority: zod_1.z.string(),
        remarks: zod_1.z.string()
    })).mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.update({
                                collection: 'leads',
                                where: {
                                    id: input.id
                                },
                                data: {
                                    updatedAt: new Date(),
                                    name: input.name,
                                    email: input.email,
                                    contact: input.contact,
                                    message: input.message,
                                    source: input.source,
                                    status: input.status,
                                    priority: input.priority,
                                    remarks: input.remarks
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getVendor: trpc_1.publicProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'vendors',
                                where: {
                                    id: {
                                        equals: input.id,
                                    }
                                },
                                limit: 1
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLikes: trpc_1.publicProcedure
        .input(zod_1.z.object({
        userId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'likes',
                                where: {
                                    user: {
                                        equals: input.userId,
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    getLikesFromVendId: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'likes',
                                where: {
                                    vendor: {
                                        equals: input.vendorId,
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    isLiked: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
        userId: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'likes',
                                where: {
                                    user: {
                                        equals: input.userId,
                                    },
                                    vendor: {
                                        equals: input.vendorId
                                    }
                                }
                            })];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }),
    addLike: trpc_1.publicProcedure
        .input(zod_1.z.object({
        vendorId: zod_1.z.string(),
        userId: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, alreadyLikedBefore;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'likes',
                                data: {
                                    vendor: input.vendorId,
                                    user: input.userId
                                }
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'likesArchive',
                                where: {
                                    vendor: { equals: input.vendorId },
                                    user: { equals: input.userId }
                                }
                            })];
                    case 3:
                        alreadyLikedBefore = _b.sent();
                        if (!(alreadyLikedBefore.docs.length === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, payload.create({
                                collection: 'likesArchive',
                                data: {
                                    vendor: input.vendorId,
                                    user: input.userId
                                }
                            })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }),
    removeLike: trpc_1.publicProcedure
        .input(zod_1.z.object({
        likeId: zod_1.z.string(),
    })).mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.delete({
                                collection: 'likes',
                                id: input.likeId
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }),
    getTopVendor: trpc_1.publicProcedure
        .input(zod_1.z.object({
        category: zod_1.z.string()
    })).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var payload, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'featured',
                                where: {
                                    id: '65a3e090f66a58e7b5eb9542'
                                }
                            })];
                    case 2:
                        results = _b.sent();
                        if (input.category === 'venues') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Venue,
                                    top4: results.docs[0].top4Venues
                                }];
                        }
                        else if (input.category === 'agents') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Agent,
                                    top4: results.docs[0].top4Agents
                                }];
                        }
                        else if (input.category === 'bridals') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Bridal,
                                    top4: results.docs[0].top4Bridals
                                }];
                        }
                        else if (input.category === 'photovideo') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Photovideo,
                                    top4: results.docs[0].top4Photovideo
                                }];
                        }
                        else if (input.category === 'catering') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Catering,
                                    top4: results.docs[0].top4Catering
                                }];
                        }
                        else if (input.category === 'decor') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Decor,
                                    top4: results.docs[0].top4Decor
                                }];
                        }
                        else if (input.category === 'henna') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Henna,
                                    top4: results.docs[0].top4Henna
                                }];
                        }
                        else if (input.category === 'mua') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Mua,
                                    top4: results.docs[0].top4Mua
                                }];
                        }
                        else if (input.category === 'emcees') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Emcee,
                                    top4: results.docs[0].top4Emcees
                                }];
                        }
                        else if (input.category === 'honeymoon') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Honeymoon,
                                    top4: results.docs[0].top4Honeymoon
                                }];
                        }
                        else if (input.category === 'misc') {
                            return [2 /*return*/, {
                                    top: results.docs[0].top1Misc,
                                    top4: results.docs[0].top4Misc
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }),
    getInfiniteProducts: trpc_1.publicProcedure
        .input(zod_1.z.object({
        limit: zod_1.z.number().min(1).max(100),
        cursor: zod_1.z.number().nullish(),
        query: query_validator_1.QueryValidator,
    }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var query, cursor, sort, limit, queryOpts, payload, parsedQueryOpts, page, _b, items, hasNextPage, nextPage;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = input.query, cursor = input.cursor;
                        sort = query.sort, limit = query.limit, queryOpts = __rest(query, ["sort", "limit"]);
                        return [4 /*yield*/, (0, get_payload_1.getPayloadClient)()];
                    case 1:
                        payload = _c.sent();
                        parsedQueryOpts = {};
                        Object.entries(queryOpts).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            if (key === 'search') {
                                parsedQueryOpts['name'] = {
                                    contains: value
                                };
                            }
                            else {
                                parsedQueryOpts[key] = {
                                    equals: value,
                                };
                            }
                        });
                        page = cursor || 1;
                        return [4 /*yield*/, payload.find({
                                collection: 'vendors',
                                where: __assign({}, parsedQueryOpts),
                                sort: sort,
                                depth: 1,
                                limit: limit,
                                page: page,
                            })];
                    case 2:
                        _b = _c.sent(), items = _b.docs, hasNextPage = _b.hasNextPage, nextPage = _b.nextPage;
                        return [2 /*return*/, {
                                items: items,
                                nextPage: hasNextPage ? nextPage : null,
                            }];
                }
            });
        });
    }),
});
