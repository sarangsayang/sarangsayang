'use client'

import { useEffect } from "react";
import { cn } from '@/lib/utils'
import { Vendor } from "@/payload-types";
import { Heart } from "lucide-react";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const LikeButton = ({
    vendor,
    user
}: {
    vendor: Vendor
    user: string
}) => {
    const addLike = trpc.addLike.useMutation()
    const removeLike = trpc.removeLike.useMutation()
    const getQuery = trpc.isLiked.useQuery({
        vendorId: vendor.id,
        userId: user
    })

    const query = getQuery.data?.docs

    

    const isLiked = () => {
        if (user && query) {
            if (query.length === 1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const heartcolor = isLiked() ? "text-blue-500 group-hover:text-blue-600'" : "text-gray-400 group-hover:text-gray-500'"

    //useEffect(() => {heartcolor}, [isLiked()])


    return (
        <>
            <Heart 
                onClick={() => {
                    if (isLiked() && query) {
                        removeLike.mutate({
                            likeId: query[0].id
                        })
                    } else {
                        addLike.mutate({
                            vendorId: vendor.id,
                            userId: user
                        })
                    }
                }}
                aria-hidden='true'
                className={cn('h-6 w-6 flex-shrink-0 cursor-pointer', heartcolor)}
            />
        </>
    )
}

export default LikeButton