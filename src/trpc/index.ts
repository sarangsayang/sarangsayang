import { date, z } from 'zod'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'



import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function formatWithLeadingZero(num: number) {
  return num < 10 ? "0" + num : num;
}



export const appRouter = router({
  auth: authRouter,

  getEnquiries12M: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const resultsArray = []

      for (let i = 12; i > -1; i= i-1) {
        let currentMonth = input.month - i
        let currentYear = input.year

        let followingMonth = currentMonth + 1
        let followingYear = input.year

          if (currentMonth === 0) {
            currentMonth = 12
            currentYear = currentYear - 1
          } else if (currentMonth < 0) {
            currentMonth = currentMonth + 12
            currentYear = currentYear -1
            followingMonth = currentMonth + 1
          }

          if (followingMonth > 12) {
            followingMonth = followingMonth - 12
            followingYear = followingYear + 1
          }
        
        const results1 = await prisma.leads.findMany({
          where: {
            vendorId: input.vendorId,
            createdAt: {
                gte: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
                lt: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        const results2 = await prisma.leads.findMany({
          where: {
            vendorId: input.vendorId,
            source: 'Sarang Sayang',
            createdAt: {
                gte: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
                lt: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: results1.length,
          ss: results2.length
        })
      }

      return resultsArray
    }), 

  getVendorLikes12M: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const resultsArray = []

      for (let i = 12; i > -1; i= i-1) {
        let currentMonth = input.month - i
        let currentYear = input.year

        let followingMonth = currentMonth + 1
        let followingYear = input.year

          if (currentMonth === 0) {
            currentMonth = 12
            currentYear = currentYear - 1
          } else if (currentMonth < 0) {
            currentMonth = currentMonth + 12
            currentYear = currentYear -1
            followingMonth = currentMonth + 1
          }

          if (followingMonth > 12) {
            followingMonth = followingMonth - 12
            followingYear = followingYear + 1
          }
        
        const results = await prisma.likes.findMany({
          where: {
            vendorId: input.vendorId,
            createdAt: {
                gte: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
                lt: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: results.length
        })
      }

      return resultsArray
    }), 

  getSSLeadsThisMonth: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await prisma.leads.findMany({
        where: {
          vendorId: input.vendorId,
          source: 'Sarang Sayang',
          createdAt: {
            gte: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            lt: ltDate
          }
        }
      })
    }),

  getVendorLikesThisMonth: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await prisma.likes.findMany({
        where: {
          vendorId: input.vendorId,
          createdAt: {
            gte: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            lt: ltDate
          }
        }
      })
    }),

  getEnquiriesThisMonth: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await prisma.leads.findMany({
        where: {
          vendorId: input.vendorId,
          createdAt: {
            gte: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            lt: ltDate
          }
        }
      })
    }),

  getVendUser: publicProcedure
    .input(z.object({
      vendUserId: z.string()
    })).query(async ({input}) => {
      return await prisma.users.findFirst({
        where: {
          id: input.vendUserId
        }
      })
    }) ,

  getVendorId: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.vendors.findFirst({
        where: {
          venduserid: input.userId
        }
      })
    }),

  getLeads: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.leads.findMany({
        where: {
          vendorId: input.vendorId
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }),

    getSSLeads: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.leads.findMany({
        where: {
          vendorId: input.vendorId,
          source: 'Sarang Sayang'
        }
      })
    }),

  addLeads: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string(),
      contact: z.string(),
      message: z.string(),
      source: z.string(),
      status: z.string(),
      priority: z.string(),
      remarks: z.string(),
      vendorId: z.string()
    })).mutation(async ({input}) => {
      await prisma.leads.create({
        data: {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: input.name,
          email: input.email,
          contact: input.contact,
          message: input.message,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks,
          vendorId: input.vendorId,  
        }
      }) 
    }),

  removeLead: publicProcedure
    .input(z.object({
      leadId: z.string()
    }))
    .mutation(async ({ input }) => {
      await prisma.leads.delete({
        where: {
          id: input.leadId
        }
      })
    }),

  getLead: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.leads.findUnique({
        where: {
          id: input.id
        }
      })
    }),

  updateLead: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      contact: z.string(),
      message: z.string(),
      source: z.string(),
      status: z.string(),
      priority: z.string(),
      remarks: z.string()
    })).mutation(async ({ input }) => {
      await prisma.leads.update({
        where: {
          id: input.id
        },
        data : {
          updatedAt: new Date(),
          name: input.name,
          email: input.email,
          contact: input.contact,
          message: input.message,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks
        }
      })
    }),

  getVendor: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.vendors.findUnique({
        where: {
          id: input.id
        }
      })
    }),

  getLikes: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.likes.findMany(
        {where: {
          userId: input.userId
        }}
      )
  }),

  getLikesFromVendId: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      return await prisma.likes.findMany(
        {where: {
          vendorId: input.vendorId
        }}
      )
  }),

  isLiked: publicProcedure
    .input(z.object({
      vendorId: z.string(),
      userId: z.string()
    }))
    .query(async ({input}) => {
      const like = await prisma.likes.findFirst({
        where: {
          vendorId: input.vendorId,
          userId: input.userId
        }
      })
      return like
    }),

  addLike: publicProcedure
    .input(z.object({
      vendorId: z.string(),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      await prisma.likes.create({
        data: {
          vendorId: input.vendorId,
          userId: input.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
  }),

  removeLike: publicProcedure
  .input(z.object({
    likeId: z.string(),
  })).mutation(async ({ input }) => {
    await prisma.likes.delete({
      where: {
        id: input.likeId
      }
    })
  }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<
        string,
        { equals: string }
      > = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'vendors',
        where: {
          ...parsedQueryOpts
        },
        sort,
        depth: 1,
        limit,
        page,
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),
})
  
export type AppRouter = typeof appRouter
