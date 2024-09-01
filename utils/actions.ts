'use server';

import { createProfileSchema } from "./schemas";

export const createProfileAction =async (prevState:any,formData:FormData)=>{
  try{
    const rowData = Object.fromEntries(formData);
    const validateFields = createProfileSchema.parse(rowData);
    console.log(validateFields)
    return {
      message:'profile created'
    }
  }catch(error){
    console.log(error)
    return {
      message:'there was an error'
    }
  }
}