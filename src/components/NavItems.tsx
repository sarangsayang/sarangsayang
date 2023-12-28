'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'

interface NavItemsProps {
  signedIn: boolean
}

const NavItems = ({signedIn}: NavItemsProps) => {
  const [activeIndex, setActiveIndex] = useState<
    null | number
  >(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div className='flex gap-4 h-full' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (!category.locked) {
            if (activeIndex === i) {
              setActiveIndex(null)
            } else {
              setActiveIndex(i)
            }
          // } else if (category.locked && signedIn) {
          //   if (activeIndex === i) {
          //     setActiveIndex(null)
          //   } else {
          //     setActiveIndex(i)
          //   }
          } else {
            null
          }
        }

        const close = () => setActiveIndex(null)

        const isOpen = i === activeIndex

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
            leftconstraint={category.leftconstraint}
            locked={category.locked}
            signedIn={signedIn}
          />
        )
      })}
    </div>
  )
}

export default NavItems
