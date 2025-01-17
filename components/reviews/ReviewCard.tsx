import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";


type ReviewCardProps = {
  reviewInfo:{
    name:string;
    image:string;
    comment:string;
    rating:number;
  };
  children:React.ReactNode;
}

const ReviewCard = ({reviewInfo,children}:ReviewCardProps) => {
  const {name,image,comment,rating} = reviewInfo;
  return (
    <Card className='relative'>
      <CardHeader>
        <div className="flex items-center">
          <Image src={image} alt={name} width={48} height={48} className="object-cover rounded-full"/>
          <div className="ml-4 ">
            <h3 className="text-sm font-bold capitalize mb-1">
              {name}
            </h3>
            <Rating rating={rating}/>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment}/>
      </CardContent>
      {/* delete button */}
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  )
}

export default ReviewCard