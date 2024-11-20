"use client";
import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Card, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

type CountInputProps = {
  detail:string;
  defaultValue?:number;
}

const CounterInput = ({detail,defaultValue}:CountInputProps) => {
  const [count,setCount] = useState(defaultValue || 0);
  const handleIncrease = ()=>{
    setCount(prev=> prev + 1);
  }
  const handleDecrease = ()=>{
    setCount(prev=>{
      if(prev > 0){
        return prev - 1
      }else{
        return prev
      }
    })
  }
  return (
    <Card className='mb-4'>
      <input type="hidden" value={count} name={detail}/>
      <CardHeader className='flex flex-col gap-5'>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col">
            <h2 className='font-medium capitalize'>{detail}</h2>
            <p className='text-muted-foreground text-sm'>
              Specify the number of {detail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} size={"icon"} type="button" onClick={handleDecrease}>
            <LuMinus className='w-5 h-5 text-primary' />
            </Button>
            <span className='text-xl font-bold w-5 text-center'>{count}</span>
            <Button
              variant='outline'
              size='icon'
              type='button'
              onClick={handleIncrease}
            >
              <LuPlus className='w-5 h-5 text-primary' />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default CounterInput