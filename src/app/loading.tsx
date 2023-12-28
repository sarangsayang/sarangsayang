'use client'

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"


const Loading = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    //const timer = setTimeout(() => setProgress(100), 500)
    //return () => clearTimeout(timer)
    setProgress(100)
  }, [])

  return (
    <div className='grid h-screen place-items-center'>
      <Progress value={progress} className="w-[40%]" />
    </div>
  )
}

export default Loading