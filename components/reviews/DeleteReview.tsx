import { deleteReviewAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import IconButton from "../form/IconButton";

type DeleteReviewProps = {
  reviewId:string;
}

 const DeleteReview = async ({reviewId}:DeleteReviewProps)=>{
  const deleteReview = await deleteReviewAction.bind(null,{reviewId})
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete"/>
    </FormContainer>
  )
} 
export default DeleteReview;