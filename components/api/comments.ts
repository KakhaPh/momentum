import { request } from "../services/request";

export const fetchComments = async (taskId: number) => {
    try {
        const response = await request.get(`tasks/${taskId}/comments`);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || `Failed to fetch comments: ${error.response.status}`);
        }
        throw error;
    }
};

export const postComment = async (taskId: number, text: string, parentId: number | null = null) => {
    const payload: any = {
        text,
        task_id: taskId
    };

    if (parentId !== null) {
        payload.parent_id = parentId;
    }

    try {
        const response = await request.post(`tasks/${taskId}/comments`, payload);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to post comment');
        }
        throw error;
    }
};