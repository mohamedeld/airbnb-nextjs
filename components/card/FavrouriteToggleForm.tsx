'use client';
import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import CardSubmitButton from "./CardSubmitButton";
import { toggleFavoriteAction } from "@/utils/actions";


type FavoriteToggleFormProps = {
  favoriteId:string | null ;
  propertyId:string;
}

const FavrouriteToggleForm = ({favoriteId,propertyId}:FavoriteToggleFormProps) => {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null,{
    propertyId,
    favoriteId,
    pathname
  })
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true :false}/>
    </FormContainer>
  )
}

export default FavrouriteToggleForm