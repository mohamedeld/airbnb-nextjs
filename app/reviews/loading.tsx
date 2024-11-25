'use client';

import ReviewLoadingCard from "@/components/reviews/ReviewLoadingCard";

const loading = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-4">
      <ReviewLoadingCard/>
      <ReviewLoadingCard/>
    </div>
  )
}

export default loading