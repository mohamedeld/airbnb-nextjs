'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input"
import { useDebouncedCallback } from 'use-debounce';

import { useEffect, useState } from "react";

const NavSearch = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname()
  const {replace} = useRouter();
  const [search,setSearch] = useState(searchParams?.get('search')?.toString() || '')
  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams?.toString())
    if(value){
      params.set('search',value);
    }else{
      params.delete('search');
    }
    replace(`${pathName}?${params?.toString()}`)
  },500)
  useEffect(()=>{
    if(!searchParams?.get('search')){
      setSearch('')
    }
  },[searchParams?.get('search')])
  return (
    <Input type="text" placeholder="find a property..." className="max-w-xs dark:bg-muted" value={search} onChange={(e)=> {
      setSearch(e.target.value)
      handleSearch(e.target.value)
    }}/>
  )
}

export default NavSearch