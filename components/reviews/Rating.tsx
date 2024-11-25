import {FaStar,FaRegStar} from "react-icons/fa"
type RatingProps = {
  rating:number;
}

const Rating = ({rating}:RatingProps) => {
  const stars = Array.from({length:5},(_,i)=> i+1 <= rating);
  return (
    <div className="flex items-center gap-x-1">
      {stars?.map((isFilled,i)=>{
        const className= `w-3 h-3 ${isFilled ? 'text-primary':'text-gray-400'}`
        return isFilled ? <FaStar className={className} key={i}/> : <FaRegStar key={i} className={className}/>
      })}
    </div>
  )
}

export default Rating