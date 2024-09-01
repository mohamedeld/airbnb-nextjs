import * as z from "zod";
import { ZodSchema } from "zod";

export const createProfileSchema = z.object({
  firstName:z.string().max(5,{message:'max length is 5'}).refine((value) => /^[a-zA-Z]+$/.test(value), 'Name should contain only alphabets'),
  lastName:z.string().max(20,{message:'max length is 5'}).refine((value) => /^[a-zA-Z]+$/.test(value), 'Name should contain only alphabets'),
  userName:z.string()
})