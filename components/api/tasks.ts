import { request } from "../services/request";

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await request.get('tasks');
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const fetchTask = async (id: number): Promise<SingleTask> => {
    try {
        const response = await request.get(`tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
};
