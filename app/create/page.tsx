"use client";

import TaskCreateForm from "@/components/createTask/TaskCreateForm";

const CreateTaskPage = () => {
    return (
        <>
            <h1 className='font-semibold text-[34px] leading-[100%] tracking-normal pt-3 pb-8'>შექმენი ახალი დავალება</h1>
            <TaskCreateForm />
        </>
    );
};

export default CreateTaskPage;