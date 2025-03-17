import { request } from "../services/request";

export const fetchEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await request.get("employees");
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};

export const postEmployee = async (formData: FormData): Promise<Employee> => {
    try {
        const response = await request.post("employees", formData);
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error;
    }
};