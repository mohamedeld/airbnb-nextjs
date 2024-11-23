import { FaHeart } from "react-icons/fa"
import { Button } from "../ui/button"
import { auth } from "@clerk/nextjs/server"
import CardSignInButton from "./CardSignInButton"
import { fetchFavorite } from "@/utils/actions"
import FavrouriteToggleForm from "./FavrouriteToggleForm"
type FavoriteToggleButtonProps = {
  propertyId:string
}

const FavouriteToggleButton = async ({propertyId}:FavoriteToggleButtonProps) => {
  const {userId} = await auth();
  if(!userId){
    return (
      <CardSignInButton/>
    )
  }
  const favoriteId = await fetchFavorite({propertyId});
  
  return (
    <Button className="p-2 cursor-pointer" size={"icon"} variant={"outline"}>
      <FavrouriteToggleForm favoriteId={favoriteId} propertyId={propertyId}/>
    </Button>
  )
}

export default FavouriteToggleButton