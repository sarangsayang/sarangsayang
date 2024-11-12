"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedVendors = void 0;
exports.FeaturedVendors = {
    slug: "featured",
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
        delete: function () { return true; },
    },
    fields: [
        {
            name: "top1Venue",
            type: "relationship",
            label: "Top Featured Venue",
            relationTo: "vendors",
            filterOptions: { category: { equals: "venues" } },
            hasMany: false,
        },
        {
            name: "top4Venues",
            type: "array",
            label: "3 Featured Venues",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "venues" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Stylist",
            type: "relationship",
            label: "Top Featured Stylist",
            relationTo: "vendors",
            filterOptions: { category: { equals: "stylist" } },
            hasMany: false,
        },
        {
            name: "top4Stylist",
            type: "array",
            label: "3 Featured Stylist",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "stylist" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Coordinator",
            type: "relationship",
            label: "Top Featured Berkat",
            relationTo: "vendors",
            filterOptions: { category: { equals: "coordinators" } },
            hasMany: false,
        },
        {
            name: "top4Coordinator",
            type: "array",
            label: "3 Featured Berkat",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "coordinators" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Bridal",
            type: "relationship",
            label: "Top Featured Bridal",
            relationTo: "vendors",
            filterOptions: { category: { equals: "bridals" } },
            hasMany: false,
        },
        {
            name: "top4Bridals",
            type: "array",
            label: "3 Featured Bridals",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "bridals" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Photovideo",
            type: "relationship",
            label: "Top Featured Photo & Video",
            relationTo: "vendors",
            filterOptions: { category: { equals: "photovideo" } },
            hasMany: false,
        },
        {
            name: "top4Photovideo",
            type: "array",
            label: "3 Featured Photo & Video",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "photovideo" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Mua",
            type: "relationship",
            label: "Top Featured Make Up Artist",
            relationTo: "vendors",
            filterOptions: { category: { equals: "mua" } },
            hasMany: false,
        },
        {
            name: "top4Mua",
            type: "array",
            label: "3 Featured Make Up Artists",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "mua" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Emcee",
            type: "relationship",
            label: "Top Featured Emcee",
            relationTo: "vendors",
            filterOptions: { category: { equals: "emceesperformers" } },
            hasMany: false,
        },
        {
            name: "top4Emcees",
            type: "array",
            label: "3 Featured Emcees",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "emceesperformers" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Misc",
            type: "relationship",
            label: "Top Featured Misc",
            relationTo: "vendors",
            filterOptions: { category: { equals: "misc" } },
            hasMany: false,
        },
        {
            name: "top4Misc",
            type: "array",
            label: "3 Featured Misc",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "misc" } },
                    hasMany: false,
                },
            ],
        },
    ],
};
