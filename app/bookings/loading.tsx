'use client';

import { Skeleton } from "@/components/ui/skeleton";

type LoadingProps = {
  rows?:number;
}

const loading = ({rows}:LoadingProps) => {
  const tableRows = Array.from({length:rows||5},(_,i)=>{
    return (
      <div className="mb-4" key={i}>
        <Skeleton className="w-full h-8 rounded"/>
      </div>
    )
  })
  return (
    <>{tableRows}</>
  )
}

export default loading