import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import dotenv from 'dotenv'
import { Users } from './app/collections/Users'
import { Vendors } from './app/collections/Vendors/Vendors'
import { Packages } from './app/collections/Packages'
import { Media } from './app/collections/Media'
import { Likes } from './app/collections/Likes'
import { Leads } from './app/collections/Leads'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  })

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || '',
    // ... Other S3 configuration
  },
  bucket: process.env.S3_BUCKET || '',
})
  

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users, Vendors, Packages, Media, Likes, Leads], 
    routes: {
        admin: '/backstage',
    },
    admin: {
        user: 'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- SarangSayang',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jpg',
          },
    },
    rateLimit: {
        max: 2000,
      },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
      }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    csrf: [
      'https://sarangsayang.up.railway.app'
    ],
    cors: '*',
    plugins: [
      cloudStorage({
        collections: {
          'media': {
            adapter: adapter

          }
        }
      })
    ]
})