import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin') return true;

    return {
        user: {
            equals: user?.id,
        },
    };
}

export const Likes: CollectionConfig = {
    slug: 'likes',
    admin: {
        useAsTitle: 'Your Likes',
        description: 'A summary of all your likes on Sarang Sayang',
    },
    access: {
        read: yourOwn,
        update: ({ req }) => req.user.role === 'admin',
        create: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
    },
    fields: [
        {
            name: '_isLiked',
            type: 'checkbox',
            access: {
                read: ({ req }) => req.user.role === 'admin',
                create: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            admin: {
              hidden: true,
            },
            relationTo: 'users',
            required: true,
            hasMany: false,
        },
        {
            name: 'vendor',
            type: 'relationship',
            relationTo: 'vendors',
            required: true,
            hasMany: true,
        },

    ]

}