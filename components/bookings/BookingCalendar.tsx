'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useProperty } from '@/utils/store';

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from '@/utils/calendar';
import { useToast } from '../ui/use-toast';

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range,setRange] = useState<DateRange | undefined>(defaultSelected);  
  const bookings = useProperty((state)=> state?.bookings);
  const {toast} = useToast();
  const blockedPeroids = generateBlockedPeriods({
    bookings,
    today:currentDate
  })

  const unavailableDates = generateDisabledDates(blockedPeroids);


  useEffect(()=>{
    const selectedRange = generateDateRange(range)
    const isDisabledDateInclude = selectedRange?.some((date)=>{
      if(unavailableDates[date]){
        setRange(defaultSelected);
        toast({
          description:'some dates are booked. please select again'
        })
        return true;
      }
      return false;
    })


    useProperty.setState({range})
  },[range])

  return (
    <Calendar mode='range' defaultMonth={currentDate} selected={range} onSelect={setRange} className='mb-4' disabled={blockedPeroids}/>
  )
}

export default BookingCalendar