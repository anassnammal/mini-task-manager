

export type CreateTaskFunc = (newTask: TaskFormProps) => Promise<void>;

export type UpdateTaskFunc = (taskId: string, updatedTask: TaskFormProps) => Promise<void>;

export type DeleteTaskFunc = (taskId: string) => Promise<void>;

export type TaskFormProps = {
    [key: string]: string | number;
};

