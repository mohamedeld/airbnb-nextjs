import {FaStar} from "react-icons/fa"
type PropertyRatingProps = {
  propertyId:string;
  inPage:boolean
}



const PropertyRating = ({propertyId,inPage}:PropertyRatingProps) => {
  
  const count = 100;
  const rating = 4.7;
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