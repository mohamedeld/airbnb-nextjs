'use client';
import { useState } from 'react';
import { amenities, Amenity } from '@/utils/aminities';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
type AmenitiesInputProp = {
  defaultValue?:Amenity[];
}
const AmenitiesInput = ({defaultValue}:AmenitiesInputProp) => {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    defaultValue || amenities
  );
  
  const handleChange = (aminty:Amenity)=>{
    setSelectedAmenities((prev)=>{
      return prev.map(item=>{
        if(item.name === aminty.name){
          return {...item, selected:!item.selected}
        }
        return item;
      })
    })
  }

  return (
    <section>
      <input type="hidden" name="amenities" value={JSON.stringify(selectedAmenities)}/>
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities?.map(amenity=>{
          return (
            <div key={amenity.name} className='flex items-center space-x-2'>
              <Checkbox id={amenity.name} checked={amenity.selected} onCheckedChange={()=> handleChange(amenity)}/>
              <Label
              htmlFor={amenity.name}
              className='text-sm font-medium leading-none capitalize flex gap-x-2 items-center'
            >
              {amenity.name}
              <amenity.icon className='w-4 h-4' />
            </Label>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AmenitiesInput