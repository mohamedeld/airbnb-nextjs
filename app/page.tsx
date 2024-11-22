import CardLoding from "@/components/card/CardLoding";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

type HomeProps = {
  searchParams:{
    category?:string;
  search?:string;
  }
}

export default function Home({searchParams}:HomeProps) {
  return (
    <section>
    <CategoriesList search={searchParams?.search} category={searchParams?.category}/>
    <Suspense fallback={<CardLoding/>}>

    <PropertiesContainer search={searchParams?.search} category={searchParams?.category}/>
    </Suspense>
  </section>
  );
}
