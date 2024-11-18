'use client';
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?:string;
  text?:string;
  size:btnSize
}

const SubmitButton = ({className,text,size='lg'}:SubmitButtonProps) => {
  const {pending} = useFormStatus();
  return (
    <>
     
      <Button size={size} disabled={pending} type="submit" className={`capitalize ${className}`}>
      { pending ? (
        <>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
        </>
      ):(
        <>{text}</>
      )}
    </Button>
     
    </>
  )
}

export default SubmitButton