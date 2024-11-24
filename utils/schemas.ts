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
function validateFile() {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ['image/'];
  
  return z.custom<File>((file) => {
    if (!(file instanceof File)) {
      return false;
    }
    
    // Check file size
    if (file.size > maxUploadSize) {
      return false;
    }
    
    // Check file type
    if (!acceptedFileTypes.some(type => file.type.startsWith(type))) {
      return false;
    }
    
    return true;
  }, {
    message: "Invalid file. Must be an image less than 1MB"
  });
}
export const imageSchema = z.object({
   image: validateFile(),
});


export const propertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  tagline: z
    .string()
    .min(2, {
      message: 'tagline must be at least 2 characters.',
    })
    .max(100, {
      message: 'tagline must be less than 100 characters.',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
  country: z.string({message:"country is required"}),
  guests: z.coerce.number().int().min(0, {
    message: 'guest amount must be a positive number.',
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: 'bedrooms amount must be a positive number.',
  }),
  beds: z.coerce.number().int().min(0, {
    message: 'beds amount must be a positive number.',
  }),
  baths: z.coerce.number().int().min(0, {
    message: 'bahts amount must be a positive number.',
  }),
  amenities: z.string({message:"amenities is required"}),
});


export const createReviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(10).max(1000),
});