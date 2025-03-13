import { request } from "../services/request";

export const fetchEmployees = async () => {
    try {
        const response = await request.get('employees');
        return response.data;
    } catch (error) {
        console.error('Error fetching Employees!', error);
        throw error;
    }
} 