import { Vendor } from '../payload-types'
import { create } from 'zustand'
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type LikedItem = {
  vendor: Vendor
}

type LikedState = {
  items: LikedItem[]
  addItem: (vendor: Vendor) => void
  removeItem: (vendorId: string) => void
  clearCart: () => void
}

export const useLikes = create<LikedState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (vendor) =>
        set((state) => {
          return { items: [...state.items, { vendor }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.vendor.id !== id
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
