
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import { createProfileAction } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



const CreateProfile = async () => {
  const profile = await currentUser();
  if(!profile?.privateMetadata?.hasProfile){
    redirect("/")
  }
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new User</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput name="firstName" label="First Name" placeholder="Enter your first name" type="text"/>
            <FormInput name="lasName" label="Last Name" placeholder="Enter your last name" type="text"/>
            <FormInput name="userName" label="UserName" placeholder="Enter your userName" type="text"/>
          </div>
         <SubmitButton size="lg" className="" text="Create Profile"/>
         </FormContainer>
      </div>
    </section>
  )
}

export default CreateProfile