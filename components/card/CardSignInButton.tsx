import { SignInButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { FaRegHeart } from "react-icons/fa"

const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button type="button" size={"icon"} variant={"outline"} asChild className="p-2 cursor-pointer">
        <FaRegHeart/>
      </Button>
    </SignInButton>
  )
}

export default CardSignInButton