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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packages = void 0;
var config_1 = require("../../config");
var addUser = function (_a) {
    var req = _a.req, data = _a.data;
    return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_b) {
            user = req.user;
            return [2 /*return*/, __assign(__assign({}, data), { user: user.id })];
        });
    });
};
var syncUser = function (_a) {
    var req = _a.req, doc = _a.doc;
    return __awaiter(void 0, void 0, void 0, function () {
        var fullUser, packages, allIDs_1, createdProductIDs, dataToUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, req.payload.findByID({
                        collection: "users",
                        id: req.user.id,
                    })];
                case 1:
                    fullUser = _b.sent();
                    if (!(fullUser && typeof fullUser === "object")) return [3 /*break*/, 3];
                    packages = fullUser.packages;
                    allIDs_1 = __spreadArray([], ((packages === null || packages === void 0 ? void 0 : packages.map(function (pkg) { return (typeof pkg === "object" ? pkg.id : pkg); })) ||
                        []), true);
                    createdProductIDs = allIDs_1.filter(function (id, index) { return allIDs_1.indexOf(id) === index; });
                    dataToUpdate = __spreadArray(__spreadArray([], createdProductIDs, true), [doc.id], false);
                    return [4 /*yield*/, req.payload.update({
                            collection: "users",
                            id: fullUser.id,
                            data: {
                                packages: dataToUpdate,
                            },
                        })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
};
var isAdminOrHasAccess = function () {
    return function (_a) {
        var _user = _a.req.user;
        var user = _user;
        if (!user)
            return false;
        if (user.role === "admin")
            return true;
        var userPkgIDs = (user.packages || []).reduce(function (acc, pkg) {
            if (!pkg)
                return acc;
            if (typeof pkg === "string") {
                acc.push(pkg);
            }
            else {
                acc.push(pkg.id);
            }
            return acc;
        }, []);
        return {
            id: {
                in: userPkgIDs,
            },
        };
    };
};
exports.Packages = {
    slug: "packages",
    admin: {
        useAsTitle: "name",
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    },
    hooks: {
        beforeChange: [addUser],
        afterChange: [syncUser],
    },
    fields: [
        {
            name: "vendor",
            type: "relationship",
            relationTo: "vendors",
            required: true,
            hasMany: false,
        },
        {
            name: "name",
            label: "Package Name",
            type: "text",
            required: true,
        },
        {
            name: "services",
            label: "Offered Services",
            type: "select",
            hasMany: true,
            admin: {
                isClearable: true,
                isSortable: true,
            },
            options: config_1.VENDOR_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
        },
        {
            name: "packageDetails",
            label: "Package Details",
            type: "richText",
        },
        {
            name: "pax",
            label: "Number of Pax",
            type: "number",
        },
        {
            name: "price",
            label: "Price in SGD",
            min: 0,
            max: 100000,
            type: "number",
        },
    ],
};
