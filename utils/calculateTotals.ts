import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  try {
    const totalNights = calculateDaysBetween({ checkIn, checkOut });
    const subTotal = totalNights * price;
    const cleaning = 21;
    const service = 40;
    const tax = subTotal * 0.1;
    const orderTotal = subTotal + cleaning + service + tax;
    return {
      totalNights,
      subTotal,
      cleaning,
      service,
      tax,
      orderTotal,
    };
  } catch (error: unknown) {
    console.log(error);
    throw new Error(
      error instanceof Error ? error?.message : "something went wrong"
    );
  }
};
