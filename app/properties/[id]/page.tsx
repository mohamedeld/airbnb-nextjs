import FavouriteToggleButton from "@/components/card/FavouriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BookingCalendar from "@/components/properties/BookingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";

type PropertyDetailPageParams = {
  params:{
    id:string;
  }
}

const PropertyDetailPage = async ({params}:PropertyDetailPageParams) => {
  const {id} = params;
  const property = await fetchPropertyDetails(id);
  if(!property){
    redirect("/")
  }
  const {baths,bedrooms,beds, guests} = property;
  const details = {baths,bedrooms,beds, guests};
  const firstName = property?.profile?.firstName;
  const profileImage = property?.profile?.profileImage;
  return (
    <section>
      <BreadCrumbs name={property?.name}/>
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property?.tagline}</h1>
        <div className="flex items-center gap-4">
          {/* share button */}
          <ShareButton propertyId={property?.id} name={property?.name}/>
          <FavouriteToggleButton propertyId={property?.id}/>
        </div>
      </header>
      <ImageContainer mainImage={property?.image} name={property?.name}/>
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-4 items-center ">
            <h1 className="text-xl font-bold ">{property?.name}</h1>
            <PropertyRating inPage propertyId={property?.id}/>
          </div>
            <PropertyDetails details={details}/>
            <UserInfo profile={{
              profileImage,
              firstName
            }}/>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          {/* calender */}
          <BookingCalendar/>
        </div>
      </section>
    </section>
  )
}

export default PropertyDetailPage