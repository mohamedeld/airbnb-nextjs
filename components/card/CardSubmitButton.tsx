'use client';

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type CardSubmitBtnProps = {
  isFavorite: boolean;
}


const CardSubmitButton = ({ isFavorite }: CardSubmitBtnProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="p-2 cursor-pointer" size={"icon"} variant={"outline"}>
      {pending ? <ReloadIcon className="animate-spin" /> : isFavorite ? <FaHeart /> : <FaRegHeart />}
    </Button>
  )
}

export default CardSubmitButton