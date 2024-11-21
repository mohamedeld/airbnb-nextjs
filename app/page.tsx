import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";

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
    <PropertiesContainer search={searchParams?.search} category={searchParams?.category}/>
  </section>
  );
}
