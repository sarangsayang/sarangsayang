import { CollectionConfig } from "payload/types";

export const MiscVendors: CollectionConfig = {
  slug: "misc",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "berkat",
      type: "relationship",
      label: "Berkat Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "decor",
      type: "relationship",
      label: "Decor Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "dulang",
      type: "relationship",
      label: "Dulang Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "emcees",
      type: "relationship",
      label: "Emcees and AV Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "liveStation",
      type: "relationship",
      label: "Live Station Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "performers",
      type: "relationship",
      label: "Performers Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
    {
      name: "cake",
      type: "relationship",
      label: "Wedding Cake Vendors",
      relationTo: "vendors",
      filterOptions: { category: { equals: "misc" } },
      hasMany: true,
    },
  ],
};