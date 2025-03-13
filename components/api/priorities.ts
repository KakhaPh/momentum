import { request } from "../services/request";

export const fetchPriorities = async () => {
    try {
        const response = await request.get('priorities');
        return response.data;
    } catch (error) {
        console.error('Error fetching Priorities!', error);
        throw error;
    }
}