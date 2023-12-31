import { z } from 'zod'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { authRouter } from './auth-router'
import { publicProcedure, router } from './trpc'

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
      const payload = await getPayloadClient()
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
        
        const results1 = await payload.find({
          collection: 'leads',
          where: {
            vendor: input.vendorId,
            createdAt: {
              greater_than_equal: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
              less_than: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        const results2 = await payload.find({
          collection: 'leads',
          where: {
            vendor: {
              equals: input.vendorId
            },
            source: {equals: 'Sarang Sayang'},
            createdAt: {
              greater_than_equal: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
              less_than: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: results1.docs.length,
          ss: results2.docs.length
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
      const payload = await getPayloadClient()
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
        
        const results = await payload.find({
          collection: 'likes',
          where: {
            vendor: input.vendorId,
            createdAt: {
              greater_than_equal: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
              less_than: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: results.docs.length
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
      const payload = await getPayloadClient()

      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await payload.find({
        collection: 'leads',
        where: {
          vendor: input.vendorId,
          source: 'Sarang Sayang',
          createdAt: {
            greater_than_equal: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            less_than: ltDate
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
      const payload = await getPayloadClient()

      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await payload.find({
        collection: 'likes',
        where: {
          vendor: input.vendorId,
          createdAt: {
            greater_than_equal: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            less_than: ltDate
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
      const payload = await getPayloadClient()

      const ltDate = input.month === 12 ? (new Date(`${input.year + 1}-01-01T00:00:00Z`)) : (new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`))
      return await payload.find({
        collection: 'leads',
        where: {
          vendorId: input.vendorId,
          createdAt: {
            greater_than_equal: new Date(`${input.year}-${input.month}-01T00:00:00Z`),
            less_than: ltDate
          }
        }
      })
    }),

  getVendUser: publicProcedure
    .input(z.object({
      vendUserId: z.string()
    })).query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'vendors',
        where: {
          venduserid: {
            equals: input.vendUserId,
          }
        },
        limit: 1
      })
    }) ,

  getVendorId: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'vendors',
        where: {
          venduserid: {
            equals: input.userId,
          }
        },
        limit: 1
      })
    }),

  getLeads: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'leads',
        where: {
          vendor: {
            equals: input.vendorId,
          }
        }
      })
    }),

  getSSLeads: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'leads',
        where: {
          vendor: {
            equals: input.vendorId,
          },
          source: {
            equals: 'Sarang Sayang'
          }
        }
      })
    }),

  addLead: publicProcedure
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
      const payload = await getPayloadClient()

      await payload.create({
        collection: 'leads',
        data: {
          name: input.name,
          email: input.email,
          contact: input.contact,
          message: input.message,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks,
          vendor: input.vendorId,  
        }
      }) 
    }),

  removeLead: publicProcedure
    .input(z.object({
      leadId: z.string()
    }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()

      await payload.delete({
        collection: 'leads',
        id: input.leadId
      })
    }),

  getLead: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'leads',
        where: {
          id: {
            equals: input.id,
          }
        },
        limit: 1
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
      const payload = await getPayloadClient()

      await payload.update({
        collection: 'leads',
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
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'vendors',
        where: {
          id: {
            equals: input.id,
          }
        },
        limit: 1
      })
    }),

  getLikes: publicProcedure
    .input(z.object({
      userId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'likes',
        where: {
          user: {
            equals: input.userId,
          }
        }
      })
  }),

  getLikesFromVendId: publicProcedure
    .input(z.object({
      vendorId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'likes',
        where: {
          vendor: {
            equals: input.vendorId,
          }
        }
      })
  }),

  isLiked: publicProcedure
    .input(z.object({
      vendorId: z.string(),
      userId: z.string()
    }))
    .query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'likes',
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId
          }
        }
      })
    }),

  addLike: publicProcedure
    .input(z.object({
      vendorId: z.string(),
      userId: z.string()
    }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient()

      await payload.create({
        collection: 'likes',
        data: {
          vendor: input.vendorId,
          user: input.userId
        }
      })
  }),

  removeLike: publicProcedure
  .input(z.object({
    likeId: z.string(),
  })).mutation(async ({ input }) => {
    const payload = await getPayloadClient()

    await payload.delete({
      collection: 'likes',
      id: input.likeId
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
