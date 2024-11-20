import { categories, Category } from "@/utils/categories";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type CategoriesInputProps = {
  defaultValue?:string;
}
const name = 'category'
const CategoriesInput = ({defaultValue}:CategoriesInputProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Categories
      </Label>
      <Select defaultValue={defaultValue || categories[0]?.label} name={name} required>
        <SelectTrigger id={name}>
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          {categories?.length > 0 ? (
            categories?.map((category:Category)=>{
              return (
                <SelectItem key={category?.label} value={category?.label}>
                  <span className="flex items-center gap-2">
                    <category.icon/> {category?.label}
                  </span>
                </SelectItem>
              )
            })
          ) : (<SelectItem value="">Not items found</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CategoriesInput