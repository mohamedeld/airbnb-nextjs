'use client';

import { useState } from "react";
import { Button } from "../ui/button";

type CommentProps = {
  comment:string;
}

const Comment = ({comment}:CommentProps) => {
  const [isExpanded,setIsExpanded] = useState(false);
  const toggleExpanded = ()=>{
    setIsExpanded(prev=> !prev);
  }
  const longComment = comment?.length > 130;
  const displayComment = longComment && !isExpanded ? `${comment?.slice(0,130)}...`: comment;
  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && <Button variant={"link"} className="pl-0 text-muted-foreground" onClick={toggleExpanded}>
        {isExpanded ? 'Show less':'Show more'}
        </Button>}
    </div>
  )
}

export default Comment