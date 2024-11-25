import EmptyList from "@/components/home/EmptyList";
import Title from "@/components/properties/Title";
import ReviewCard from "@/components/reviews/ReviewCard";
import { fetchPropertyReviewByUser } from "@/utils/actions"

const ReviewsPage = async () => {
  const reviews = await fetchPropertyReviewByUser();
  if(!reviews || reviews?.length === 0){
    return (
      <EmptyList/>
    )
  }
  return (
    <>
      <Title text="Your Reviews"/>
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews?.map(review=>{
          const {rating,comment} = review;
          const {name,image} = review?.property;
          const reviewInfo = {
            comment,rating,name,image
          }
          return (
            <ReviewCard reviewInfo={reviewInfo} key={review?.id}>
              <></>
            </ReviewCard>
          )
        })}
      </section>
    </>
  )
}

export default ReviewsPage