import { Department } from "./Department";

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: Department;
}