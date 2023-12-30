import { PrimaryActionEmailHtml } from '../../components/emails/PrimaryActionEmail'
import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        })
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: adminsAndUser,
    delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],
  },
  fields: [
    {
      name: 'vendor',
      label: 'Vendor',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'vendors',
      hasMany: false,
    },
    {
      name: 'packages',
      label: 'Packages',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'packages',
      hasMany: true,
    },
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      access: {
        update: ({ req }) => req.user.role === 'admin'
      },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Standard Supervendor', value: 'supervendor' },
        { label: 'Platinum Supervendor', value: 'platinum' },
        { label: 'Elite Supervendor', value: 'elite' },
      ],
    },
  ],
}
