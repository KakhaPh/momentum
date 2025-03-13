import { request } from "../services/request";

export const fetchStatuses = async () => {
    try {
        const response = await request.get('statuses');
        return response.data;
    } catch (error) {
        console.error("Failed fetching statuses!", error);
        throw error;
    }
}