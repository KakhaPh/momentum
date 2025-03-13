import { request } from "../services/request";

export const fetchDepartments = async () => {
    try {
        const response = await request.get('departments');
        return response.data;
    } catch (error) {
        console.error('Error fetching departments', error);
        throw error;
    }
}