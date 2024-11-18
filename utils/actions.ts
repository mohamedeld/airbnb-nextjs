'use server';

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileSchema } from "./schemas";
import prisma from "./db";
import { redirect } from "next/navigation";

export const createProfileAction =async (prevState:any,formData:FormData)=>{
  try{
    const user = await currentUser();
    if(!user){
      throw new Error("Please login to create a profile");
    }
    const rowData = Object.fromEntries(formData);
    const validateFields = createProfileSchema.parse(rowData);
    await prisma.profile.create({
      data:{
        clerkId:user?.id,
        email:user?.emailAddresses[0]?.emailAddress,
        profileImage:user?.imageUrl ?? '',
        ...validateFields
      }
    })
    // need to connect my profile with clerk profile
    await clerkClient.users.updateUserMetadata(user?.id,{
      privateMetadata:{
        hasProfile:true
      }
    })
    
  }catch(error){
    
    return {
      message:error instanceof Error ? error?.message :'there was an error'
    }
  }
  redirect("/")
}