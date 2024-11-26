'use client';

import { calculateTotals } from "@/utils/calculateTotals";
import { useProperty } from "@/utils/store";
import { Card, CardTitle } from "../ui/card";
import FormRow from "./FormRow";
import { Separator } from "../ui/separator";

const BookingForm = () => {
  const {range,price} = useProperty((state)=>state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const {
    totalNights,
    subTotal,
    cleaning,
    service,
    tax,
    orderTotal,
  }= calculateTotals({checkIn,checkOut,price})

  return (
    <Card className="p-8 mb-4">
      <CardTitle className="mb-8">
        <FormRow label={`$${price} X ${totalNights} nights`} amount={subTotal}/>
        <FormRow label={`Cleaning fee`} amount={cleaning}/>
        <FormRow label={`Service fee`} amount={service}/>
        <FormRow label={`Tax`} amount={tax}/>
        <Separator className="mt-4"/>
        <CardTitle className="mt-8">
          <FormRow label="Booking Total" amount={orderTotal}/>
        </CardTitle>
      </CardTitle>
    </Card>
  )
}

export default BookingForm