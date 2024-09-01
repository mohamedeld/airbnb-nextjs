import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserIcon from "./UserIcon"
import { links } from "@/utils/links"
import { Button } from "../ui/button"
import { LuAlignLeft } from "react-icons/lu"
import Link from "next/link"



const LinksDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-4 max-w-[100px]">
          <LuAlignLeft className="w-6 h-6"/>
        <UserIcon/>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="start" sideOffset={10}>
        {
          links?.map(item=>{
            return(
              <DropdownMenuItem key={item?.href} >
                <Link href={item?.href} className="capitalize w-full">{item?.label}</Link>
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown