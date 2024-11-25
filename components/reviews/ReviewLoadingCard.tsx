import { Card, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full "/>
          <div className="ml-4">
            <Skeleton className="w-[150px] h-4 mb-2 "/>
            <Skeleton className="w-[110px] h-4 "/>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ReviewLoadingCard