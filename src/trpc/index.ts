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

  updatePlan: publicProcedure
    .input(z.object({
      id: z.string(),
      brideName: z.string().optional(),
      groomName: z.string().optional(),
      weddingDate: z.string().optional(),
      venue: z.string().optional(),
      agent: z.string().optional(),
      bridal: z.string().optional(),
      photovideo: z.string().optional(),
      catering: z.string().optional(),
      decor: z.string().optional(),
      henna: z.string().optional(),
      mua: z.string().optional(),
      emcee: z.string().optional(),
      honeymoon: z.string().optional(),
      misc: z.string().optional(),
    })).mutation(async ({input}) => {
      const payload = await getPayloadClient()
      
      if (input.brideName) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            brideName: input.brideName
          }
        })
      } else if (input.groomName) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            groomName: input.groomName
          }
        })
      } else if (input.weddingDate) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            weddingDate: input.weddingDate
          }
        })
      } else if (input.venue) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            venue: input.venue
          }
        })
      } else if (input.agent) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            agent: input.agent
          }
        })
      } else if (input.bridal) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            bridal: input.bridal
          }
        })
      } else if (input.photovideo) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            photovideo: input.photovideo
          }
        })
      } else if (input.catering) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            catering: input.catering
          }
        })
      } else if (input.decor) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            decor: input.decor
          }
        })
      } else if (input.henna) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            henna: input.henna
          }
        })
      } else if (input.mua) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            mua: input.mua
          }
        })
      } else if (input.emcee) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            emcee: input.emcee
          }
        })
      } else if (input.honeymoon) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            honeymoon: input.honeymoon
          }
        })
      } else if (input.misc) {
        await payload.update({
          collection: 'plans',
          where: {
            id: {equals: input.id}
          },
          data: {
            misc: input.misc
          }
        })
      }
      
    }) ,

  createPlan: publicProcedure
    .input(z.object({
      userId: z.string()
    })).mutation(async ({input}) => {
      const payload = await getPayloadClient()

      await payload.create({
        collection: 'plans',
        data: {
          user: input.userId
        }
      })
    }),

  getPlan: publicProcedure
    .input(z.object({
      userId: z.string()
    })).query(async ({input}) => {
      const payload = await getPayloadClient()

      return await payload.find({
        collection: 'plans',
        where: {
          user: {
            equals: input.userId,
          }
        }
      })
    }),

  getEnquiries12M: publicProcedure
    .input(z.object({
      year: z.number(),
      month: z.number(),
      vendorId: z.string()
    })).query(async ({input}) => {
      const payload = await getPayloadClient()
      const resultsArray = []

      let currentEnqData = 0
      let accuEnqData = 0

      let currentSSData = 0
      let accuSSData = 0

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
            followingYear = currentYear
          }

          if (followingMonth > 12) {
            followingMonth = followingMonth - 12
            followingYear = followingYear + 1
          }
        
        const results1 = await payload.find({
          collection: 'leads',
          where: {
            vendor: {equals: input.vendorId},
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

        currentEnqData = results1.docs.length - accuEnqData
        currentSSData = results2.docs.length - accuSSData

        accuEnqData = accuEnqData + currentEnqData
        accuSSData = accuSSData + currentSSData

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentEnqData,
          ss: currentSSData
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
      let currentData = 0
      let accuData = 0

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
            followingYear = currentYear
          }

          if (followingMonth > 12) {
            followingMonth = followingMonth - 12
            followingYear = followingYear + 1
          }
        
        const results = await payload.find({
          collection: 'likesArchive',
          where: {
            vendor: {equals: input.vendorId},
            createdAt: {
              greater_than_equal: new Date(`${currentYear}-${formatWithLeadingZero(currentMonth)}-01T00:00:00Z`),
              less_than: new Date(`${followingYear}-${formatWithLeadingZero(followingMonth)}-01T00:00:00Z`)
            }
          }
        })

        currentData = results.docs.length - accuData
        accuData = accuData + currentData

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentData
        })
      }

      console.log(resultsArray)
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

      const alreadyLikedBefore = await payload.find({
        collection: 'likesArchive',
        where: {
          vendor: {equals: input.vendorId},
          user: {equals: input.userId}
        }
      })

      if (alreadyLikedBefore.docs.length === 0) {
        await payload.create({
          collection: 'likesArchive',
          data: {
            vendor: input.vendorId,
            user: input.userId
          }
        })
      }

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

  getTopVendor: publicProcedure
    .input(z.object({
      category: z.string()
    })).query(async ({input}) => {
      const payload = await getPayloadClient()

      const results = await payload.find({
        collection: 'featured',
        where: {
          id: '65a3e090f66a58e7b5eb9542'
        }
      })

      if (input.category === 'venues') {
        return {
          top: results.docs[0].top1Venue,
          top4: results.docs[0].top4Venues
        }
      } else if (input.category === 'agents') {
        return {
          top: results.docs[0].top1Agent,
          top4: results.docs[0].top4Agents
        }
      } else if (input.category === 'bridals') {
        return {
          top: results.docs[0].top1Bridal,
          top4: results.docs[0].top4Bridals
        }
      } else if (input.category === 'photovideo') {
        return {
          top: results.docs[0].top1Photovideo,
          top4: results.docs[0].top4Photovideo
        }
      } else if (input.category === 'catering') {
        return {
          top: results.docs[0].top1Catering,
          top4: results.docs[0].top4Catering
        }
      } else if (input.category === 'decor') {
        return {
          top: results.docs[0].top1Decor,
          top4: results.docs[0].top4Decor
        }
      } else if (input.category === 'henna') {
        return {
          top: results.docs[0].top1Henna,
          top4: results.docs[0].top4Henna
        }
      } else if (input.category === 'mua') {
        return {
          top: results.docs[0].top1Mua,
          top4: results.docs[0].top4Mua
        }
      } else if (input.category === 'emcees') {
        return {
          top: results.docs[0].top1Emcee,
          top4: results.docs[0].top4Emcees
        }
      } else if (input.category === 'honeymoon') {
        return {
          top: results.docs[0].top1Honeymoon,
          top4: results.docs[0].top4Honeymoon
        }
      } else if (input.category === 'misc') {
        return {
          top: results.docs[0].top1Misc,
          top4: results.docs[0].top4Misc
        }
      }
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
        { equals?: string, contains?: string }
      > = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        if (key === 'search') {
          parsedQueryOpts['name'] = {
            contains: value
          }
        } else {
            parsedQueryOpts[key] = {
              equals: value,
            }
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
