'use client';

import { useProperty } from "@/utils/store";
import BookingForm from "./BookingForm";
import ConfirmBooking from "./ConfirmBooking";

const BookingContainer = () => {
  const {range} = useProperty(state=> state);
  if(!range || !range?.to || !range?.from){
    return null;
  }
  if(range?.to?.getTime() === range?.from?.getTime()){
    return null;
  }
  return (
    <div className="w-full">
      <BookingForm/>
      <ConfirmBooking/>
    </div>
  )
}

export default BookingContainer