import { deleteBookingAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import IconButton from "../form/IconButton";

type DeleteBookingProps = {
  bookingId:string;
}

const DeleteBooking = async ({bookingId}:DeleteBookingProps) => {
  const deleteBooking = await deleteBookingAction.bind(null,{
    bookingId
  }) 
  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType="delete"/> 
    </FormContainer>
  )
}

export default DeleteBooking