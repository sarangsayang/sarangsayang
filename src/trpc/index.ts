import { date, z } from "zod";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { Package, User } from "@/payload-types";
import { format } from "date-fns";
import { sendMessageUpdateFromUser } from "@/actions/sendMessageUpdateFromUser";

function formatWithLeadingZero(num: number) {
  return num < 10 ? "0" + num : num;
}

export const appRouter = router({
  auth: authRouter,

  getClicks: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const vendor = await payload.find({
        collection: "vendors",
        where: {
          id: { equals: input.vendorId },
        },
        limit: 1,
      });

      if (vendor.docs[0].clicks) {
        return vendor.docs[0].clicks;
      } else {
        return 0;
      }
    }),

  addClick: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let clicks = 0;
      const payload = await getPayloadClient();

      const vendor = await payload.find({
        collection: "vendors",
        where: {
          id: { equals: input.vendorId },
        },
        limit: 1,
      });

      if (vendor.docs[0].clicks) {
        clicks = vendor.docs[0].clicks + 1;
      } else {
        clicks = 1;
      }

      await payload.update({
        collection: "vendors",
        where: {
          id: {
            equals: input.vendorId,
          },
        },
        data: {
          clicks: clicks,
        },
      });
    }),

  updateVendorFirstLog: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
        data: {
          vendorFirstLog: false,
        },
      });
    }),

  updateUserFirstLog: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
        data: {
          userFirstLog: false,
        },
      });
    }),

  sendWelcomeUserEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const result = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
      });

      return result;
    }),

  getMiscVendors: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "misc",
        where: {
          id: { equals: "65b7aee5c17286ca4dd3e2ed" },
        },
        pagination: false,
      });

      if (input.category === "berkat") {
        return results.docs[0].berkat;
      } else if (input.category === "decor") {
        return results.docs[0].decor;
      } else if (input.category === "dulang") {
        return results.docs[0].dulang;
      } else if (input.category === "emcees") {
        return results.docs[0].emcees;
      } else if (input.category === "liveStation") {
        return results.docs[0].liveStation;
      } else if (input.category === "performers") {
        return results.docs[0].performers;
      } else if (input.category === "cake") {
        return results.docs[0].cake;
      }
    }),

  deletePlan: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });
    }),

  removeUser2: publicProcedure
    .input(
      z.object({
        user1: z.string(),
        planId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.planId },
        },
        data: {
          user: [input.user1],
        },
      });
    }),

  addUser2: publicProcedure
    .input(
      z.object({
        user1: z.string(),
        user2: z.string(),
        planId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.planId },
        },
        data: {
          user: [input.user1, input.user2],
        },
      });
    }),

  checkUserExist: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "users",
        where: {
          email: {
            equals: input.email,
          },
        },
      });
    }),

  userRead: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor") {
          await payload.update({
            collection: "message",
            where: {
              id: {
                equals: allmsg.docs[i].id,
              },
            },
            data: {
              read: true,
            },
          });
        }
      }
    }),

  userGetAllUnread: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const chat = await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
        },
      });

      if (chat.docs.length > 0) {
        for (let i = 0; i < chat.docs.length; i++) {
          const allmsg = await payload.find({
            collection: "message",
            where: {
              chat: {
                equals: chat.docs[i],
              },
            },
          });
          for (let i = 0; i < allmsg.docs.length; i++) {
            if (
              allmsg.docs[i].read === false &&
              allmsg.docs[i].from === "vendor"
            ) {
              results++;
            }
          }
        }
      }

      return results;
    }),

  userGetUnread: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "-createdAt",
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "vendor") {
          results++;
        }
      }

      return results;
    }),

  vendorRead: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "user") {
          await payload.update({
            collection: "message",
            where: {
              id: {
                equals: allmsg.docs[i].id,
              },
            },
            data: {
              read: true,
            },
          });
        }
      }
    }),

  getAllUnread: publicProcedure
    .input(z.object({ vendorId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const chat = await payload.find({
        collection: "chats",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
      });

      if (chat.docs.length > 0) {
        for (let i = 0; i < chat.docs.length; i++) {
          const allmsg = await payload.find({
            collection: "message",
            where: {
              chat: {
                equals: chat.docs[i],
              },
            },
          });
          for (let i = 0; i < allmsg.docs.length; i++) {
            if (
              allmsg.docs[i].read === false &&
              allmsg.docs[i].from === "user"
            ) {
              results++;
            }
          }
        }
      }

      return results;
    }),

  getUnread: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      let results = 0;

      const allmsg = await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "-createdAt",
      });

      for (let i = 0; i < allmsg.docs.length; i++) {
        if (allmsg.docs[i].read === false && allmsg.docs[i].from === "user") {
          results++;
        }
      }

      return results;
    }),

  getMessages: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "message",
        where: {
          chat: {
            equals: input.chatId,
          },
        },
        pagination: false,
        sort: "createdAt",
      });
    }),

  addMessage: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
        from: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "message",
        data: {
          chat: input.chatId,
          from: input.from,
          message: input.message,
          read: false,
        },
      });
    }),

  createChat: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      // Find out if chat exist
      const doesChatExist = await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
      });

      if (doesChatExist.docs.length === 0) {
        await payload.create({
          collection: "chats",
          data: {
            user: input.userId,
            vendor: input.vendorId,
          },
        });

        const getChat = await payload.find({
          collection: "chats",
          where: {
            user: {
              equals: input.userId,
            },
            vendor: {
              equals: input.vendorId,
            },
          },
        });

        const user = getChat.docs[0].user as User;

        await payload.create({
          collection: "leads",
          data: {
            name: user.name,
            email: user.email,
            contact: "-",
            message: "-",
            source: "Sarang Sayang",
            status: "not contacted",
            priority: "high",
            remarks: "-",
            vendor: input.vendorId,
            chat: getChat.docs[0].id,
          },
        });
      }
    }),

  getAllChats: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  getVendorChats: publicProcedure
    .input(z.object({ vendorId: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  getChat: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "chats",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  removeItinerary: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "itinerary",
        id: input.id,
      });
    }),

  editItinerary: publicProcedure
    .input(
      z.object({
        id: z.string(),
        time: z.number().optional(),
        date: z.string().optional(),
        location: z.string().optional(),
        event: z.string().optional(),
        involved: z.string().optional(),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.time) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            time: input.time,
          },
        });
      } else if (input.date) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            date: input.date,
          },
        });
      } else if (input.location) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            location: input.location,
          },
        });
      } else if (input.event) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            event: input.event,
          },
        });
      } else if (input.involved) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            involved: input.involved,
          },
        });
      } else if (input.details) {
        await payload.update({
          collection: "itinerary",
          where: { id: { equals: input.id } },
          data: {
            details: input.details,
          },
        });
      }
    }),

  getItineraryByDate: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        date: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "itinerary",
        where: { plan: { equals: input.planId }, date: { equals: input.date } },
        pagination: false,
        sort: "time",
      });
    }),

  getItinerary: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "itinerary",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });

      let dates = [];

      for (let i = 0; i < results.docs.length; i++) {
        dates.push(results.docs[i].date);
      }

      for (let i = 0; i < dates.length; i++) {
        if (dates[i] === dates[i + 1]) {
          dates.splice(i + 1, 1);
        }
      }

      return dates;
    }),

  addItinerary: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        date: z.string(),
        time: z.number(),
        location: z.string().optional(),
        event: z.string().optional(),
        involved: z.string().optional(),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "itinerary",
        data: {
          plan: input.planId,
          date: input.date,
          time: input.time,
          location: input.location || "-",
          event: input.event || "-",
          involved: input.involved || "-",
          details: input.details || "-",
        },
      });
    }),

  removeGuest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "guests",
        id: input.id,
      });
    }),

  editGuests: publicProcedure
    .input(
      z.object({
        id: z.string(),
        group: z.string().optional(),
        name: z.string().optional(),
        pax: z.number().optional(),
        attendance: z.string().optional(),
        sent: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.group) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            group: input.group,
          },
        });
      } else if (input.name) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            name: input.name,
          },
        });
      } else if (input.pax) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            pax: input.pax,
          },
        });
      } else if (input.attendance) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            attendance: input.attendance,
          },
        });
      } else if (input.sent === true || input.sent === false) {
        await payload.update({
          collection: "guests",
          where: { id: { equals: input.id } },
          data: {
            sent: input.sent,
          },
        });
      }
    }),

  getGuests: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "guests",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "createdAt",
      });
    }),

  addGuest: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        group: z.string(),
        name: z.string(),
        pax: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "guests",
        data: {
          plan: input.planId,
          group: input.group,
          name: input.name,
          pax: input.pax,
          attendance: "Waiting Confirmation",
          sent: false,
        },
      });
    }),

  removeBudget: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "budget",
        id: input.id,
      });
    }),

  editBudget: publicProcedure
    .input(
      z.object({
        id: z.string(),
        for: z.string().optional(),
        cat: z.string().optional(),
        details: z.string().optional(),
        plannedCost: z.number().optional(),
        actualCost: z.number().optional(),
        amountPaid: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.for) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            for: input.for,
          },
        });
      } else if (input.cat) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            cat: input.cat,
          },
        });
      } else if (input.details) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            details: input.details,
          },
        });
      } else if (input.plannedCost) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            plannedCost: input.plannedCost,
          },
        });
      } else if (input.actualCost) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            actualCost: input.actualCost,
          },
        });
      } else if (input.amountPaid) {
        await payload.update({
          collection: "budget",
          where: { id: { equals: input.id } },
          data: {
            amountPaid: input.amountPaid,
          },
        });
      }
    }),

  addBudget: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        for: z.string(),
        cat: z.string(),
        details: z.string().optional(),
        plannedCost: z.number().optional(),
        actualCost: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      let details = input.details;
      let plannedCost = input.plannedCost;
      let actualCost = input.actualCost;

      if (!input.details) {
        details = "-";
      }

      if (!input.plannedCost) {
        plannedCost = 0;
      }

      if (!input.actualCost) {
        actualCost = 0;
      }

      await payload.create({
        collection: "budget",
        data: {
          plan: input.planId,
          for: input.for,
          cat: input.cat,
          details: details || "-",
          plannedCost: plannedCost,
          actualCost: actualCost,
          amountPaid: 0,
        },
      });
    }),

  getBudget: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "budget",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "createdAt",
      });
    }),

  removeTodo: publicProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "todos",
        id: input.todoId,
      });
    }),

  editTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        todo: z.string().optional(),
        date: z.string().optional(),
        check: z.boolean().optional(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.todo) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            todo: input.todo,
          },
        });
      } else if (input.date) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            date: input.date,
          },
        });
      } else if (input.check === true || input.check === false) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            done: input.check,
          },
        });
      } else if (input.remarks) {
        await payload.update({
          collection: "todos",
          where: { id: { equals: input.id } },
          data: {
            remarks: input.remarks,
          },
        });
      }
    }),

  getTodoByTodo: publicProcedure
    .input(
      z.object({
        todo: z.string(),
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "todos",
        where: { todo: { equals: input.todo }, plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });
    }),

  getTodo: publicProcedure
    .input(
      z.object({
        planId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "todos",
        where: { plan: { equals: input.planId } },
        pagination: false,
        sort: "date",
      });
    }),

  addTodo: publicProcedure
    .input(
      z.object({
        planId: z.string(),
        todo: z.string(),
        date: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.remarks) {
        await payload.create({
          collection: "todos",
          data: {
            plan: input.planId,
            todo: input.todo,
            date: input.date,
            remarks: input.remarks,
            done: false,
          },
        });
      } else {
        await payload.create({
          collection: "todos",
          data: {
            plan: input.planId,
            todo: input.todo,
            date: input.date,
            done: false,
          },
        });
      }
    }),

  planRemovePackage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        packageId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const plan = await payload.find({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });

      const packages = plan.docs[0].packages as Package[];
      let packageIds = [];

      for (let i = 0; i < packages.length; i++) {
        if (packages[i].id !== input.packageId) {
          packageIds.push(packages[i].id);
        }
      }

      await payload.update({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
        data: {
          packages: packageIds,
        },
      });
    }),

  planAddPackage: publicProcedure
    .input(
      z.object({
        id: z.string(),
        packageId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const plan = await payload.find({
        collection: "plans",
        where: {
          id: { equals: input.id },
        },
      });

      if (plan.docs[0].packages) {
        let packageIds = [];
        const packages = plan.docs[0].packages as Package[];
        for (let i = 0; i < packages.length; i++) {
          packageIds.push(packages[i].id);
        }
        packageIds.push(input.packageId);

        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            packages: packageIds,
          },
        });
      } else {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            packages: [input.packageId],
          },
        });
      }
    }),

  updatePlan: publicProcedure
    .input(
      z.object({
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
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      if (input.brideName) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            brideName: input.brideName,
          },
        });
      } else if (input.groomName) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            groomName: input.groomName,
          },
        });
      } else if (input.weddingDate) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            weddingDate: input.weddingDate,
          },
        });
      } else if (input.venue) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            venue: input.venue,
          },
        });
      } else if (input.agent) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            agent: input.agent,
          },
        });
      } else if (input.bridal) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            bridal: input.bridal,
          },
        });
      } else if (input.photovideo) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            photovideo: input.photovideo,
          },
        });
      } else if (input.catering) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            catering: input.catering,
          },
        });
      } else if (input.decor) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            decor: input.decor,
          },
        });
      } else if (input.henna) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            henna: input.henna,
          },
        });
      } else if (input.mua) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            mua: input.mua,
          },
        });
      } else if (input.emcee) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            emcee: input.emcee,
          },
        });
      } else if (input.honeymoon) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            honeymoon: input.honeymoon,
          },
        });
      } else if (input.misc) {
        await payload.update({
          collection: "plans",
          where: {
            id: { equals: input.id },
          },
          data: {
            misc: input.misc,
          },
        });
      }
    }),

  createPlan: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "plans",
        data: {
          user: [input.userId],
        },
      });
    }),

  getPlan: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "plans",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  createPlanIfNil: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "plans",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });

      if (results.docs.length === 0) {
        await payload.create({
          collection: "plans",
          data: {
            user: [input.userId],
          },
        });
      }
    }),

  getEnquiries12M: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const resultsArray = [];

      let currentEnqData = 0;
      let accuEnqData = 0;

      let currentSSData = 0;
      let accuSSData = 0;

      for (let i = 12; i > -1; i = i - 1) {
        let currentMonth = input.month - i;
        let currentYear = input.year;

        let followingMonth = currentMonth + 1;
        let followingYear = input.year;

        if (currentMonth === 0) {
          currentMonth = 12;
          currentYear = currentYear - 1;
        } else if (currentMonth < 0) {
          currentMonth = currentMonth + 12;
          currentYear = currentYear - 1;
          followingMonth = currentMonth + 1;
          followingYear = currentYear;
        }

        if (followingMonth > 12) {
          followingMonth = followingMonth - 12;
          followingYear = followingYear + 1;
        }

        const results1 = await payload.find({
          collection: "leads",
          where: {
            vendor: { equals: input.vendorId },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        const results2 = await payload.find({
          collection: "leads",
          where: {
            vendor: {
              equals: input.vendorId,
            },
            source: { equals: "Sarang Sayang" },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        currentEnqData = results1.docs.length - accuEnqData;
        currentSSData = results2.docs.length - accuSSData;

        accuEnqData = accuEnqData + currentEnqData;
        accuSSData = accuSSData + currentSSData;

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentEnqData,
          ss: currentSSData,
        });
      }

      return resultsArray;
    }),

  getVendorLikes12M: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();
      const resultsArray = [];
      let currentData = 0;
      let accuData = 0;

      for (let i = 12; i > -1; i = i - 1) {
        let currentMonth = input.month - i;
        let currentYear = input.year;

        let followingMonth = currentMonth + 1;
        let followingYear = input.year;

        if (currentMonth === 0) {
          currentMonth = 12;
          currentYear = currentYear - 1;
        } else if (currentMonth < 0) {
          currentMonth = currentMonth + 12;
          currentYear = currentYear - 1;
          followingMonth = currentMonth + 1;
          followingYear = currentYear;
        }

        if (followingMonth > 12) {
          followingMonth = followingMonth - 12;
          followingYear = followingYear + 1;
        }

        const results = await payload.find({
          collection: "likesArchive",
          where: {
            vendor: { equals: input.vendorId },
            createdAt: {
              greater_than_equal: new Date(
                `${currentYear}-${formatWithLeadingZero(
                  currentMonth
                )}-01T00:00:00Z`
              ),
              less_than: new Date(
                `${followingYear}-${formatWithLeadingZero(
                  followingMonth
                )}-01T00:00:00Z`
              ),
            },
          },
          pagination: false,
        });

        currentData = results.docs.length - accuData;
        accuData = accuData + currentData;

        resultsArray.push({
          month: currentMonth,
          year: currentYear,
          data: currentData,
        });
      }

      console.log(resultsArray);
      return resultsArray;
    }),

  getSSLeadsThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "leads",
        where: {
          vendor: { equals: input.vendorId },
          source: { equals: "Sarang Sayang" },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getVendorLikesThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "likes",
        where: {
          vendor: { equals: input.vendorId },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getEnquiriesThisMonth: publicProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number(),
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const ltDate =
        input.month === 12
          ? new Date(`${input.year + 1}-01-01T00:00:00Z`)
          : new Date(`${input.year}-${input.month + 1}-01T00:00:00Z`);
      return await payload.find({
        collection: "leads",
        where: {
          vendorId: { equals: input.vendorId },
          createdAt: {
            greater_than_equal: new Date(
              `${input.year}-${input.month}-01T00:00:00Z`
            ),
            less_than: ltDate,
          },
        },
        pagination: false,
      });
    }),

  getVendUser: publicProcedure
    .input(
      z.object({
        vendUserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          venduserid: {
            equals: input.vendUserId,
          },
        },
        limit: 1,
      });
    }),

  getVendorId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          venduserid: {
            equals: input.userId,
          },
        },
        limit: 1,
      });
    }),

  getLeads: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "leads",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
        sort: "createdAt",
      });
    }),

  getSSLeads: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "leads",
        where: {
          vendor: {
            equals: input.vendorId,
          },
          source: {
            equals: "Sarang Sayang",
          },
        },
        pagination: false,
      });
    }),

  addLead: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        contact: z.string(),
        message: z.string(),
        source: z.string(),
        status: z.string(),
        priority: z.string(),
        remarks: z.string(),
        vendorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "leads",
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
        },
      });
    }),

  removeLead: publicProcedure
    .input(
      z.object({
        leadId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "leads",
        id: input.leadId,
      });
    }),

  getLead: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "leads",
        where: {
          id: {
            equals: input.id,
          },
        },
        limit: 1,
      });
    }),

  updateLead: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        contact: z.string(),
        source: z.string(),
        status: z.string(),
        priority: z.string(),
        remarks: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.update({
        collection: "leads",
        where: {
          id: { equals: input.id },
        },
        data: {
          updatedAt: new Date().toISOString(),
          name: input.name,
          email: input.email,
          contact: input.contact,
          source: input.source,
          status: input.status,
          priority: input.priority,
          remarks: input.remarks,
        },
      });
    }),

  getVendor: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "vendors",
        where: {
          id: {
            equals: input.id,
          },
        },
        limit: 1,
      });
    }),

  getLikes: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          user: {
            equals: input.userId,
          },
        },
        pagination: false,
      });
    }),

  getLikesFromVendId: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  isLiked: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      return await payload.find({
        collection: "likes",
        where: {
          user: {
            equals: input.userId,
          },
          vendor: {
            equals: input.vendorId,
          },
        },
        pagination: false,
      });
    }),

  addLike: publicProcedure
    .input(
      z.object({
        vendorId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.create({
        collection: "likes",
        data: {
          vendor: input.vendorId,
          user: input.userId,
        },
      });

      const alreadyLikedBefore = await payload.find({
        collection: "likesArchive",
        where: {
          vendor: { equals: input.vendorId },
          user: { equals: input.userId },
        },
      });

      if (alreadyLikedBefore.docs.length === 0) {
        await payload.create({
          collection: "likesArchive",
          data: {
            vendor: input.vendorId,
            user: input.userId,
          },
        });
      }
    }),

  removeLike: publicProcedure
    .input(
      z.object({
        likeId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();

      await payload.delete({
        collection: "likes",
        id: input.likeId,
      });
    }),

  getTopVendor: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const payload = await getPayloadClient();

      const results = await payload.find({
        collection: "featured",
        where: {
          id: { equals: "65a3e090f66a58e7b5eb9542" },
        },
      });

      if (input.category === "venues") {
        return {
          top: results.docs[0].top1Venue,
          top4: results.docs[0].top4Venues,
        };
      } else if (input.category === "agents") {
        return {
          top: results.docs[0].top1Agent,
          top4: results.docs[0].top4Agents,
        };
      } else if (input.category === "bridals") {
        return {
          top: results.docs[0].top1Bridal,
          top4: results.docs[0].top4Bridals,
        };
      } else if (input.category === "photovideo") {
        return {
          top: results.docs[0].top1Photovideo,
          top4: results.docs[0].top4Photovideo,
        };
      } else if (input.category === "catering") {
        return {
          top: results.docs[0].top1Catering,
          top4: results.docs[0].top4Catering,
        };
      } else if (input.category === "decor") {
        return {
          top: results.docs[0].top1Decor,
          top4: results.docs[0].top4Decor,
        };
      } else if (input.category === "henna") {
        return {
          top: results.docs[0].top1Henna,
          top4: results.docs[0].top4Henna,
        };
      } else if (input.category === "mua") {
        return {
          top: results.docs[0].top1Mua,
          top4: results.docs[0].top4Mua,
        };
      } else if (input.category === "emcees") {
        return {
          top: results.docs[0].top1Emcee,
          top4: results.docs[0].top4Emcees,
        };
      } else if (input.category === "honeymoon") {
        return {
          top: results.docs[0].top1Honeymoon,
          top4: results.docs[0].top4Honeymoon,
        };
      } else if (input.category === "misc") {
        return {
          top: results.docs[0].top1Misc,
          top4: results.docs[0].top4Misc,
        };
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
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<
        string,
        { equals?: string; contains?: string }
      > = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        if (key === "search") {
          parsedQueryOpts["name"] = {
            contains: value,
          };
        } else {
          parsedQueryOpts[key] = {
            equals: value,
          };
        }
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "vendors",
        where: {
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
