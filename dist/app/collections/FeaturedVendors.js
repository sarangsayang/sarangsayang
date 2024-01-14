"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedVendors = void 0;
exports.FeaturedVendors = {
    slug: 'featured',
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== 'admin';
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: 'top1Venue',
            type: 'relationship',
            label: 'Top Featured Venue',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'venues' } },
            hasMany: false
        },
        {
            name: 'top4Venues',
            type: 'array',
            label: '3 Featured Venues',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'venues' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Agent',
            type: 'relationship',
            label: 'Top Featured Agent',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'agents' } },
            hasMany: false
        },
        {
            name: 'top4Agents',
            type: 'array',
            label: '3 Featured Agents',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'agents' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Bridal',
            type: 'relationship',
            label: 'Top Featured Bridal',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'bridals' } },
            hasMany: false
        },
        {
            name: 'top4Bridals',
            type: 'array',
            label: '3 Featured Bridals',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'bridals' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Photovideo',
            type: 'relationship',
            label: 'Top Featured Photo & Video',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'photovideo' } },
            hasMany: false
        },
        {
            name: 'top4Photovideo',
            type: 'array',
            label: '3 Featured Photo & Video',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'photovideo' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Catering',
            type: 'relationship',
            label: 'Top Featured Catering',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'catering' } },
            hasMany: false
        },
        {
            name: 'top4Catering',
            type: 'array',
            label: '3 Featured Catering',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'catering' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Decor',
            type: 'relationship',
            label: 'Top Featured Decor',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'decor' } },
            hasMany: false
        },
        {
            name: 'top4Decor',
            type: 'array',
            label: '3 Featured Decor',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'decor' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Henna',
            type: 'relationship',
            label: 'Top Featured Henna',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'henna' } },
            hasMany: false
        },
        {
            name: 'top4Henna',
            type: 'array',
            label: '3 Featured Henna',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'henna' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Mua',
            type: 'relationship',
            label: 'Top Featured Make Up Artist',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'mua' } },
            hasMany: false
        },
        {
            name: 'top4Mua',
            type: 'array',
            label: '3 Featured Make Up Artists',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'mua' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Emcee',
            type: 'relationship',
            label: 'Top Featured Emcee',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'emcees' } },
            hasMany: false
        },
        {
            name: 'top4Emcees',
            type: 'array',
            label: '3 Featured Emcees',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'emcees' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Honeymoon',
            type: 'relationship',
            label: 'Top Featured Honeymoon',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'honeymoon' } },
            hasMany: false
        },
        {
            name: 'top4Honeymoon',
            type: 'array',
            label: '3 Featured Honeymoon',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'honeymoon' } },
                    hasMany: false,
                },
            ]
        },
        {
            name: 'top1Misc',
            type: 'relationship',
            label: 'Top Featured Misc',
            relationTo: 'vendors',
            filterOptions: { category: { equals: 'misc' } },
            hasMany: false
        },
        {
            name: 'top4Misc',
            type: 'array',
            label: '3 Featured Misc',
            maxRows: 3,
            fields: [
                {
                    name: 'vendor',
                    type: 'relationship',
                    relationTo: 'vendors',
                    filterOptions: { category: { equals: 'misc' } },
                    hasMany: false,
                },
            ]
        },
    ]
};
