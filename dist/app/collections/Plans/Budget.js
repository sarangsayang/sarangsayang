"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
exports.Budget = {
    slug: 'budget',
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        }
    },
    access: {
        read: function () { return true; },
        update: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: 'plan',
            type: 'relationship',
            relationTo: 'plans',
            required: true,
            hasMany: false,
        },
        {
            name: 'for',
            type: 'text',
            required: true,
        },
        {
            name: 'cat',
            type: 'text',
            required: true,
        },
        {
            name: 'details',
            type: 'text',
            required: true,
        },
        {
            name: 'plannedCost',
            type: 'number',
            required: false,
        },
        {
            name: 'actualCost',
            type: 'number',
            required: false,
        },
        {
            name: 'amountPaid',
            type: 'number',
            required: false,
        }
    ]
};