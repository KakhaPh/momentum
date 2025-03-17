import { z } from "zod";

const CreateEmployeeFormSchema = z.object({
    name: z.string()
        .min(2, { message: "მინიმუმ 2 სიმბოლო" })
        .max(256, { message: "მაქსიმუმ 256 სიმბოლო" }),
    surname: z.string()
        .min(2, { message: "მინიმუმ 2 სიმბოლო" })
        .max(256, { message: "მაქსიმუმ 256 სიმბოლო" }),
    department: z.string().min(1, { message: "დეპარტამენტი სავალდებულოა" }),
    department_id: z.number().nullable().refine(val => val !== null, {
        message: "დეპარტამენტი სავალდებულოა",
    }),
    avatar: z.any().refine((files) => typeof window !== 'undefined' && files instanceof FileList && files.length > 0, {
        message: "ავატარის ატვირთვა აუცილებელია",
    }),
})


export type EmployeeFormSchema = z.infer<typeof CreateEmployeeFormSchema>;

export { CreateEmployeeFormSchema };
