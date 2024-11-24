'use client';

import { useState } from "react"
import Title from "./Title";
import { Button } from "../ui/button";

type DescriptionProps = {
  description:string
} 
const Description = ({description}:DescriptionProps) => {
  const [isFullDescriptionShown,setIsFullDescriptionShown] = useState(false);
  const words = description?.split(' ');
  const isLongDescription = words?.length > 100;
  const toggleDescription = ()=>{
    setIsFullDescriptionShown(prev=> !prev);
  }

  const displayedDescription = isLongDescription && !isFullDescriptionShown ? words?.splice(0,100)?.join(" "): description
  return (
    <article className="mt-4 ">
      <Title text={"Description"}/>
      <p className="text-muted-foreground font-light leading-loose">{displayedDescription}</p>
      {isLongDescription && <Button variant={"link"} className="pl-0 " onClick={toggleDescription}>
          {isFullDescriptionShown ? 'Show less' : 'Show more'}
        </Button>}
    </article>
  )
}

export default Description