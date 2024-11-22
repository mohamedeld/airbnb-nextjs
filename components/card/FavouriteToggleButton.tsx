import { FaHeart } from "react-icons/fa"
import { Button } from "../ui/button"
import { auth } from "@clerk/nextjs/server"
import CardSignInButton from "./CardSignInButton"
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
  return (
    <Button className="p-2 cursor-pointer" size={"icon"} variant={"outline"}>
      <FaHeart/>
    </Button>
  )
}

export default FavouriteToggleButton