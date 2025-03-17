import { z } from "zod";

const CreateTaskSchema = z.object({
    name: z
        .string()
        .min(1, "სათაური სავალდებულოა")
        .min(2, "მინიმუმ 2 სიმბოლო")
        .max(255, "მაქსიმუმ 255 სიმბოლო"),
    description: z
        .string()
        .min(1, "აღწერა სავალდებულოა")
        .min(2, "მინიმუმ 2 სიმბოლო")
        .max(255, "მაქსიმუმ 255 სიმბოლო"),
    priority_id: z.number().nullable().refine(val => val !== null, "პრიორიტეტი სავალდებულოა"),
    status_id: z.number().nullable().refine(val => val !== null, "სტატუსი სავალდებულოა"),
    department_id: z.number().nullable().refine(val => val !== null, "დეპარტამენტი სავალდებულოა"),
    employee_id: z.number().nullable().refine(val => val !== null, "თანამშრომელი სავალდებულოა"),
    due_date: z.string().min(1, "შესრულების თარიღი სავალდებულოა")
});

export type TaskSchema = z.infer<typeof CreateTaskSchema>;

export { CreateTaskSchema };