import { fetchPropertyRating } from "@/utils/actions";
import {FaStar} from "react-icons/fa";

type PropertyRatingProps = {
  propertyId:string;
  inPage:boolean;
}



const PropertyRating = async ({propertyId,inPage}:PropertyRatingProps) => {
    const result = await fetchPropertyRating(propertyId)
    if(!result || (!result?.rating && result?.count === 0)){
      return null;
    }
    const {rating,count}=result;
  const className=`flex gap-1 items-center ${inPage? 'text-md':'text-xs'}`;
  const countText = count > 1 ? 'reviews':'review';
  const countValue = `(${count}) ${inPage ? countText:''}`
  return (
    <span className={className}>
      <FaStar className="w-3 h-3"/>
      {rating} {countValue}
    </span>
  )
}

export default PropertyRating