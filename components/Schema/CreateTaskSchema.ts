import { z } from "zod";

const CreateTaskSchema = z.object({
    name: z
    .string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
    description: z.string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
    priority_id: z.number({
        required_error: "გთხოვთ აირჩიოთ პრიორიტეტი",
        invalid_type_error: "გთხოვთ აირჩიოთ პრიორიტეტი",
    }),
    status_id: z.number({
        required_error: "გთხოვთ აირჩიოთ სტატუსი",
        invalid_type_error: "გთხოვთ აირჩიოთ სტატუსი",
    }),
    department_id: z.number({
        required_error: "გთხოვთ აირჩიოთ დეპარტამენტი",
        invalid_type_error: "გთხოვთ აირჩიოთ დეპარტამენტი",
    }),
    employee_id: z.number({
        required_error: "გთხოვთ აირჩიოთ თანამშრომელი",
        invalid_type_error: "გთხოვთ აირჩიოთ თანამშრომელი",
    }),
    due_date: z.string().min(1, "შესრულების თარიღი სავალდებულოა")

});

export type TaskSchema = z.infer<typeof CreateTaskSchema>;

export { CreateTaskSchema };