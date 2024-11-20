'use server';

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileSchema, imageSchema, propertySchema, validateWithZodSchema } from "./schemas";
import prisma from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";

export const getAuthUser = async ()=>{
  try{
    const user = await currentUser();
    if(!user){
      throw new Error("user not found");
    }
    if(!user?.privateMetadata?.hasProfile){
      redirect('/profile/create')
    }
    return user;
  }catch(error){
    console.log(error)
  }
}

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

export const fetchProfileImage = async ()=>{
  try{
    const user = await currentUser();
    if(!user){
      throw new Error("there is no user found")
    }
    const profile = await prisma.profile.findUnique({
      where:{
        clerkId:user?.id
      },
      select:{
        profileImage:true
      }
    })
    return profile?.profileImage
  }catch(error){
    console.log(error)
  }
}

export const fetchProfile = async()=>{
  const user = await getAuthUser();
  const profile = prisma.profile.findUnique({
    where:{
      clerkId:user?.id
    }
  })
  if(!profile){
    redirect("/profile/create")
  }
  return profile;
}

export const updateProfileAction = async (prevState:any,formData:FormData):Promise<{message:string}>=>{
  try{  
      const user = await getAuthUser();
      const rawData = Object.fromEntries(formData);
      const validateFields = createProfileSchema.safeParse(rawData);
      if(!validateFields?.success){
        const errors = validateFields?.error.errors?.map(error=> error?.message);
        throw new Error(errors?.join(","))
      }
      await prisma.profile.update({
        where:{
          clerkId:user?.id
        },
        data:validateFields?.data
      })
      revalidatePath("/profile")
    return {
      message:"Updated profile successfully"
    }
  }catch(error){
    return {
      message:error instanceof Error ? error?.message : 'Something went wrong'
    }
  }
}

export const updateProfileImageAction = async(prevState:any,formData:FormData):Promise<{message:string}>=>{
  try{
    const user = await getAuthUser();
    const image = formData.get("image") as File;
    // const validateFields = validateWithZodSchema(imageSchema,{image});
    const fullPath = await uploadImage(image);

    await prisma?.profile?.update({
      where:{
        clerkId:user?.id
      },
      data:{
        profileImage:fullPath
      }
    })

    revalidatePath("/profile");
    return {
      message:"image updated successfully"
    }
  }catch(error){
    console.log(error);
    return {
      message:error instanceof Error ? error?.message : 'Something went wrong'
    }
  }
}

export const createPropertyAction= async (prevState:any,formData:FormData):Promise<{message:string}>=>{
  const user = getAuthUser();
  try{
    const rowData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(propertySchema,rowData);

    // await prisma.property.create({
    //   data:{

    //   }
    // })

    return {
      message: 'property created successfully'
    }
  }catch(error){
    console.log(error);
    return {
      message:error instanceof Error ? error?.message : 'Something went wrong'
    }
  }
  redirect("/rentals")
}