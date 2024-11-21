import { PropertyCardProps } from "@/utils/types"
import PropertyCard from "./PropertyCard"


type PropertiesListProps = {
  properties:PropertyCardProps[]  
}

const PropertiesList = ({properties}:PropertiesListProps) => {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4'>
      {properties?.length > 0 && properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  )
}

export default PropertiesList