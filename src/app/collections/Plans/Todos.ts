import { CollectionConfig } from "payload/types";

export const Todos: CollectionConfig = {
    slug: 'todos',
    admin: {
        hidden: ({ user }) => user.role !== 'admin'
    },
    access: {
        read: () => true,
        create: () => true,
        delete: () => true,
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
            name: 'todo',
            type: 'text',
            required: true,
        },
        {
            name: 'date',
            type: 'date',
            required: true,
        },
        {
            name: 'done',
            type: 'checkbox',
            required: false,
        }
    ]
}