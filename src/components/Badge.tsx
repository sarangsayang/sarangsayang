'use client'

import { trpc } from '@/trpc/client'
import { BadgeCheck } from 'lucide-react'

interface BadgeProps {
    vendUserId: string
}

const Badge = ({vendUserId}: BadgeProps) => {
    const user = trpc.getVendUser.useQuery({
        vendUserId: vendUserId
      }).data

  return (
    <>
        {user && user.role === 'vendor' ? <BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-blue-400'/> : null}
        {user && user.role === 'supervendor' ? <BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-yellow-400'/> : null}
    </>
  )
}

export default Badge