
import { FolderSearch } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface EnquiriesTriggerProps {
    leads: object[]
    itemCount: number
}


const EnquiriesTrigger = ({leads, itemCount}: EnquiriesTriggerProps) => {
    const [trigger, setTrigger] = useState(false)

    const count = itemCount
    const data = leads

    //useEffect(() => {setTrigger(true)}, [itemCount])
    
    const numberColor = trigger ? "text-rose-500 group-hover:text-rose-600" : "text-gray-700 group-hover:text-gray-800"


  return (
    <>
        <FolderSearch
            aria-hidden='true'
            className='h-6 w-6 flex-shrink-0 text-blue-400 group-hover:text-blue-500'
        />
        <span className={cn('ml-2 text-sm font-medium', numberColor)}>
            {leads ? itemCount : 0}
            
        </span>
    </>
  ) 
}

export default EnquiriesTrigger

