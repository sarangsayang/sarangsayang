import { AfterChangeHook, BeforeChangeHook } from 'payload/dist/collections/config/types'
import { VENDOR_CATEGORIES } from '../../../config'
import { Access, CollectionConfig } from 'payload/types'
import { User, Vendor } from '../../../payload-types'

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null
  return { ...data, venduserid: user?.id }
}

const yourOwnVendor: Access = async ({req}) => {
  const user = req.user as User | null
  if (!user) return false
  if (user.role === 'admin') return true

  const { docs: vendors } = await req.payload.find({
    collection: 'vendors',
    where: {
      venduserid: {
        equals: user.id,
      },
    },
  })

  const ownVendorIds = vendors.map((vendor) => vendor.id).flat()

  return {
    id: {
      in: ownVendorIds,
    },
  }

}


export const Vendors: CollectionConfig = {
    slug: 'vendors',
    admin: {
      useAsTitle: 'name',
      hideAPIURL: true,
    },
    hooks: {
      beforeChange: [addUser],
    },
    access: {
        create: ({ req }) => req.user.role === 'admin',
        read: yourOwnVendor,
        update: yourOwnVendor,
        delete: ({ req }) => req.user.role === 'admin',
    },
    fields: [
      {
        name: 'venduserid',
        label: 'Vendor User ID',
        type: 'relationship',
        relationTo: 'users',
        access: {
          read: ({ req }) => req.user.role === 'admin',
          create: ({ req }) => req.user.role === 'admin',
          update: ({ req }) => req.user.role === 'admin',
        },
        required: true,
        hasMany: false,
      },
      {
        name: 'name',
        label: 'Vendor Name',
        type: 'text',
        required: true,
      },
      {
        name: 'category',
        label: 'Vendor Category',
        type: 'select',
        options: VENDOR_CATEGORIES.map(
          ({ label , value }) => ({ label, value })
        ),
        required: true,
      },
      {
        name: 'details',
        type: 'textarea',
        label: 'Vendor Details',
        required: false,
      },
      {
        name: 'location',
        label: 'Vendor Location',
        type: 'text',
        required: false,
      },
      {
        name: 'packages',
        type: 'relationship',
        label: 'Vendor Package(s)',
        required: false,
        relationTo: 'packages',
        hasMany: true,
      },
      {
        name: 'images',
        type: 'array',
        label: 'Product images',
        minRows: 1,
        maxRows: 4,
        labels: {
          singular: 'Image',
          plural: 'Images',
        },
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
        ],
      },
    ],
  }