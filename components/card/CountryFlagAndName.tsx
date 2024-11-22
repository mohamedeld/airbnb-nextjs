import { findCountryByCode } from "@/utils/countries"

type CountryFlagAndNameProps = {
  countryCode:string
}

const CountryFlagAndName = ({countryCode}:CountryFlagAndNameProps) => {
  const validCountry= findCountryByCode(countryCode)!;
  const countryName= validCountry?.name?.length > 20 ? `${validCountry?.name?.substring(0,20)}...` : validCountry?.name;
  return (
    <span className="flex items-center justify-between gap-2 text-sm">{validCountry?.flag} {countryName}</span>
  )
}

export default CountryFlagAndName