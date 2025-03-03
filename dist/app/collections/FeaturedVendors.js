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
            name: "top1Coordinator",
            type: "relationship",
            label: "Top Featured Coordinator",
            relationTo: "vendors",
            filterOptions: { category: { equals: "coordinators" } },
            hasMany: false,
        },
        {
            name: "top4Coordinator",
            type: "array",
            label: "3 Featured Coordinators",
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
            name: "top1Packages",
            type: "relationship",
            label: "Top Featured Packages",
            relationTo: "vendors",
            filterOptions: { category: { equals: "packages" } },
            hasMany: false,
        },
        {
            name: "top4Packages",
            type: "array",
            label: "3 Featured Packages",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "packages" } },
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
            name: "top1Pakandam",
            type: "relationship",
            label: "Top Featured Pak Andam",
            relationTo: "vendors",
            filterOptions: { category: { equals: "pakandam" } },
            hasMany: false,
        },
        {
            name: "top4Pakandam",
            type: "array",
            label: "3 Featured Pak Andam",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "pakandam" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Berkat",
            type: "relationship",
            label: "Top Featured Berkat",
            relationTo: "vendors",
            filterOptions: { category: { equals: "berkat" } },
            hasMany: false,
        },
        {
            name: "top4Berkat",
            type: "array",
            label: "3 Featured Berkat",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "berkat" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Dulang",
            type: "relationship",
            label: "Top Featured Dulang",
            relationTo: "vendors",
            filterOptions: { category: { equals: "dulang" } },
            hasMany: false,
        },
        {
            name: "top4Dulang",
            type: "array",
            label: "3 Featured Dulang",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "dulang" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Live",
            type: "relationship",
            label: "Top Featured Live Stations",
            relationTo: "vendors",
            filterOptions: { category: { equals: "live" } },
            hasMany: false,
        },
        {
            name: "top4Live",
            type: "array",
            label: "3 Featured Live Stations",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "live" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Henna",
            type: "relationship",
            label: "Top Featured Henna",
            relationTo: "vendors",
            filterOptions: { category: { equals: "henna" } },
            hasMany: false,
        },
        {
            name: "top4Henna",
            type: "array",
            label: "3 Featured Henna",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "henna" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Emcee",
            type: "relationship",
            label: "Top Featured Emcee",
            relationTo: "vendors",
            filterOptions: { category: { equals: "emcees" } },
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
                    filterOptions: { category: { equals: "emcees" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Performers",
            type: "relationship",
            label: "Top Featured Performers",
            relationTo: "vendors",
            filterOptions: { category: { equals: "performers" } },
            hasMany: false,
        },
        {
            name: "top4Performers",
            type: "array",
            label: "3 Featured Performers",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "performers" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Prep",
            type: "relationship",
            label: "Top Featured Prep",
            relationTo: "vendors",
            filterOptions: { category: { equals: "prep" } },
            hasMany: false,
        },
        {
            name: "top4Prep",
            type: "array",
            label: "3 Featured Prep",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "prep" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1BnG",
            type: "relationship",
            label: "Top Featured Bridesmaids & Groomsmen",
            relationTo: "vendors",
            filterOptions: { category: { equals: "bng" } },
            hasMany: false,
        },
        {
            name: "top4BnG",
            type: "array",
            label: "3 Featured Bridesmaids & Groomsmen",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "bng" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Cake",
            type: "relationship",
            label: "Top Featured Cake",
            relationTo: "vendors",
            filterOptions: { category: { equals: "cake" } },
            hasMany: false,
        },
        {
            name: "top4Cake",
            type: "array",
            label: "3 Featured Cake",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "cake" } },
                    hasMany: false,
                },
            ],
        },
        {
            name: "top1Catering",
            type: "relationship",
            label: "Top Featured Catering",
            relationTo: "vendors",
            filterOptions: { category: { equals: "catering" } },
            hasMany: false,
        },
        {
            name: "top4Catering",
            type: "array",
            label: "3 Featured Catering",
            maxRows: 3,
            fields: [
                {
                    name: "vendor",
                    type: "relationship",
                    relationTo: "vendors",
                    filterOptions: { category: { equals: "catering" } },
                    hasMany: false,
                },
            ],
        },
    ],
};
