'use client'

import { trpc } from "@/trpc/client"
import CatLikeItem from "./CatLikeItem"
import { categories } from "@/app/data/data"

interface CategorizedLikesProps {
    userId: string
}

const CategorizedLikes = ({userId}: CategorizedLikesProps) => {
    const likes = trpc.getLikes.useQuery({
        userId: userId
    })

  return (
    <div className="flex flex-col gap-3">
        {categories.map((category) => (
            <section className='py-12 px-9 bg-blue-100 rounded-lg' key={category.value}>
                {likes && likes.data ? <CatLikeItem data={likes.data} category={category.value} icon={category.icon} label={category.label} /> : null}
            </section>
        ))}
    </div>
  )
}

export default CategorizedLikes