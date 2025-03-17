import { Department } from "./Department";
import { Employee } from "./Employee";
import { Priority } from "./Priority";
import { Status } from "./Status";

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;
    department: Department;
    employee: Employee;
    status: Status;
    priority: Priority;
    total_comments: number;
}