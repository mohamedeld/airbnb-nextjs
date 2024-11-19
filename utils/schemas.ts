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
export const imageSchema = z.object({
  // image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, 'File must be an image');
}