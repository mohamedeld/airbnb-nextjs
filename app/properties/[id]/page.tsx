
import FavouriteToggleButton from "@/components/card/FavouriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import PropertyReview from "@/components/reviews/PropertyReview";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

type PropertyDetailPageParams = {
  params:{
    id:string;
  }
}

const DynamicMap = dynamic(()=> import("@/components/properties/PropertyMap"),{
  ssr:false,
  loading:()=> <Skeleton className="h-[400px] w-full"/>
});

const DynamicBookingCalendar = dynamic(()=> import("@/components/bookings/BookingWrapper"),{
  ssr:false,
  loading:()=><Skeleton className="h-[200px] w-full"/>
})

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

  const {userId} = await auth()
  const isNotOwner = property?.profile?.clerkId !== userId;
  const reviewDoesNotExist = userId && isNotOwner && !(await findExistingReview(userId,property?.id));
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
            <Separator className="mt-4"/>
            <Description description={property?.description}/>
            <Amenities amenities={property?.amenities}/>
            <DynamicMap countryCode={property?.country}/>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          {/* calender */}
          <DynamicBookingCalendar propertyId={property?.id} price={property?.price} bookings={property?.Booking} />
        </div>
      </section>
      {
        reviewDoesNotExist && (
          <SubmitReview propertyId={property?.id}/>
        )
      }
      <PropertyReview propertyId={property?.id}/>
    </section>
  )
}

export default PropertyDetailPage