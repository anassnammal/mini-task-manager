import { Task } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";

const useApi = (userId: string) => {
const TASK_API_URL = '/api/tasks';
    const [data, setData] = useState<Task[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchData = useCallback( async () => {
        setIsPending(true);
        setIsError(false);
        try {
            const res = await fetch(`/api/tasks?user_id=${userId}`);
            const result = await res.json();
            setData(result.tasks);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }, [userId]);

    const createData = async (newTask: Task) => {
        setIsPending(true);
        setIsError(false);
        try {
            const res = await fetch(TASK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            const result = await res.json();
            setData(prevData => [...prevData, result.task]);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    const updateData = async (taskId: string, updatedTask: Task) => {
        setIsPending(true);
        setIsError(false);
        try {
            const res = await fetch(TASK_API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            const result = await res.json();
            setData(prevData => prevData.map(task => task.id === parseInt(taskId) ? result.task : task));
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    const deleteData = async (taskId: string) => {
        setIsPending(true);
        setIsError(false);
        try {
            await fetch(`${TASK_API_URL}?task_id=${taskId}`, {
                method: 'DELETE'
            });
            setData(prevData => prevData.filter(task => task.id !== parseInt(taskId)));
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId, fetchData]);

    return { data, isSuccess, isPending, isError, createData, updateData, deleteData };
};

export default useApi;