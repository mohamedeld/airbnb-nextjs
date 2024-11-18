import * as z from "zod";
import { ZodSchema } from "zod";

export const createProfileSchema = z.object({
  firstName:z.string().max(20,{message:'first name max length is 20'}).refine((value) => /^[a-zA-Z]+$/.test(value), 'Name should contain only alphabets'),
  lasName:z.string().max(20,{message:'last name max length is 20'}).refine((value) => /^[a-zA-Z]+$/.test(value), 'Name should contain only alphabets'),
  userName:z.string()
})

export function validateWithZodSchema<T>(schema:ZodSchema<T>,data:unknown):T{
  const result = schema?.safeParse(data);
  if(!result?.success){
    const errors = result?.error?.errors?.map(error=> error?.message);
    throw new Error(errors?.join(","))
  }
  return result?.data
} 