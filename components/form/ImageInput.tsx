import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IProps{
  name:string;
}
const ImageInput = ({name}:IProps) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">Image</Label>
      <Input type="file" name={name} id={name} required accept="image/*" className="max-w-xs"/>
    </div>
  )
}

export default ImageInput