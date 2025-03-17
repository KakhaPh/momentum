export interface SingleTask {
    id: number;
    name: string;
    description: string;
    due_date: string;
    department: {
        id: number;
        name: string;
    };
    employee: {
        id: number;
        name: string;
        surname: string;
        avatar: string;
        department: {
            id: number;
            name: string;
        };
    };
    status: {
        id: number;
        name: string;
    };
    priority: {
        id: number;
        name: string;
        icon: string;
    };
}