import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { formattedCountries } from '@/utils/countries';
type CountryInputProps = {
  defaultValue?:string;
}
const name = "country";
const CountryInput = ({defaultValue}:CountryInputProps) => {
  return (
    <div className="mb">
      <Label htmlFor={name} className="capitalize">country</Label>
      <Select defaultValue={defaultValue || formattedCountries[0]?.code} name={name} required>
        <SelectTrigger>
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          {
            formattedCountries?.length > 0 ? 
              formattedCountries?.map((country)=>{
                return (
                  <SelectItem key={country?.code} value={country?.code}>
                    <span className='flex items-center gap-2'>
                  {country?.flag} {country?.name}
                </span>
                  </SelectItem>
                )
              })
            :(
              <SelectItem value="">No items found</SelectItem>
            )
          }
        </SelectContent>
      </Select>
    </div>
  )
}

export default CountryInput