'use client';
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type SubmitButtonProps = {
  className?:string;
  text?:string;
}

const SubmitButton = ({className,text}:SubmitButtonProps) => {
  const {pending} = useFormStatus();
  return (
    <>
     
      <Button disabled={pending} type="submit" className={`capitalize ${className}`} size='lg'>
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