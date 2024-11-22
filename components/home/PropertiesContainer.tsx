import { fetchProperties } from "@/utils/actions";
import { PropertyCardProps } from "@/utils/types";
import EmptyList from "./EmptyList";
import PropertiesList from "./PropertiesList";

type PropertiesContainerProps = {
  category?:string;
  search?:string;
}

const PropertiesContainer = async ({
  category,
  search
}:PropertiesContainerProps) => {
  const properties:PropertyCardProps[] = await fetchProperties({
    search,
    category
  });
  console.log(properties)
  if(properties?.length === 0){
    return (
      <EmptyList heading='No results.'
      message='Try changing or removing some of your filters.'
      btnText='Clear Filters'/>
    )
  }
  
  return (
    <PropertiesList properties={properties}/>
  )
}

export default PropertiesContainer