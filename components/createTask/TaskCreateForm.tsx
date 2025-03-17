"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "@/components/custom/CustomInput";
import CustomTextArea from "@/components/custom/CustomTextArea";
import CustomSelect from "@/components/custom/CustomSelect";
import { fetchStatuses } from "../api/statuses";
import { fetchPriorities } from "../api/priorities";
import { fetchDepartments } from "../api/department";
import { fetchEmployees } from "../api/employees";
import { createTask } from "../api/tasks";
import CustomDateInput from "../custom/CustomDataInput";
import { CreateTaskSchema, TaskSchema } from "../Schema/CreateTaskSchema";

interface TaskCreateFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSuccess }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
        reset,
        trigger,
    } = useForm<TaskSchema>({
        resolver: zodResolver(CreateTaskSchema),
        mode: "onChange",
        defaultValues: {
            priority_id: undefined,
            status_id: undefined,
            department_id: undefined,
            employee_id: undefined,
        }
    });

    const [statuses, setStatuses] = useState<Status[]>([]);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const watchAllFields = watch();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [statusesData, prioritiesData, departmentsData, employeesData] = await Promise.all([
                    fetchStatuses(),
                    fetchPriorities(),
                    fetchDepartments(),
                    fetchEmployees()
                ]);

                setStatuses(statusesData);
                setPriorities(prioritiesData);
                setDepartments(departmentsData);
                setEmployees(employeesData);
                setFilteredEmployees(employeesData);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        setFilteredEmployees(employees);
    }, [employees]);

    useEffect(() => {
        const savedFormString = sessionStorage.getItem("taskForm");
        if (!savedFormString) return;

        try {
            const savedForm = JSON.parse(savedFormString);
            Object.entries(savedForm).forEach(([key, value]) => {
                if (value !== undefined) {
                    setValue(key as keyof TaskSchema, value as any);
                }
            });
        } catch (error) {
            console.error("Error parsing saved form data:", error);
            sessionStorage.removeItem("taskForm");
        }
    }, [setValue]);

    useEffect(() => {
        if (!isDirty) return;
        sessionStorage.setItem("taskForm", JSON.stringify(watchAllFields));
    }, [watchAllFields, isDirty]);

    const handleStatusSelect = (id: number) => {
        setValue("status_id", id, { shouldValidate: true });
    };

    const handlePrioritySelect = (id: number) => {
        setValue("priority_id", id, { shouldValidate: true });
    };

    const handleDepartmentSelect = (id: number) => {
        setValue("department_id", id, { shouldValidate: true });
    };

    const handleEmployeeSelect = (id: number) => {
        setValue("employee_id", id, { shouldValidate: true });
    };

    const getInputStyle = (fieldName: keyof TaskSchema) => {
        const value = watch(fieldName);

        if (errors[fieldName]) {
            return "error";
        } else if (value) {
            return "success";
        } else {
            return "default";
        }
    };

    const onSubmit: SubmitHandler<TaskSchema> = async (data) => {
        setIsLoading(true);
        setSubmitError(null);

        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("due_date", data.due_date);
            formData.append("priority_id", String(data.priority_id));
            formData.append("status_id", String(data.status_id));
            formData.append("department_id", String(data.department_id));
            formData.append("employee_id", String(data.employee_id));

            await createTask(formData);

            sessionStorage.removeItem("taskForm");
            reset();
            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/');
            }
        } catch (error: any) {
            console.error("Error submitting task data:", error);
            setSubmitError(error?.response?.data?.message || "დავალების შექმნა ვერ მოხერხდა");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedStatus = statuses.find(s => s.id === watch("status_id")) || null;
    const selectedPriority = priorities.find(p => p.id === watch("priority_id")) || null;
    const selectedDepartment = departments.find(d => d.id === watch("department_id")) || null;
    const selectedEmployee = employees.find(e => e.id === watch("employee_id")) || null;

    return (
        <div className="flex border-[0.3px] border-purplebg rounded-sm bg-[#f9f7fd] w-full min-h-[958px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex pt-16 pl-[52px] gap-40">
                    <div className="flex flex-col gap-6 w-[550px]">
                        <CustomInput
                            header="სათაური*"
                            label={
                                errors.name
                                    ? errors.name.message
                                    : "მინიმუმ 2 სიმბოლო, მაქსიმუმ 255 სიმბოლო"
                            }
                            register={register("name", {
                                onChange: () => trigger("name")
                            })}
                            style={getInputStyle("name")}
                        />
                        <div className="pt-8">
                            <CustomTextArea
                                header="აღწერა*"
                                label={
                                    errors.description
                                        ? errors.description.message
                                        : "მინიმუმ 2 სიმბოლო, მაქსიმუმ 255 სიმბოლო"
                                }
                                register={register("description", {
                                    onChange: () => trigger("description")
                                })}
                                style={getInputStyle("description")}
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                            {priorities.length > 0 && (
                                <CustomSelect
                                    header="პრიორიტეტი*"
                                    options={priorities}
                                    selectedOption={selectedPriority}
                                    onSelect={handlePrioritySelect}
                                    error={errors.priority_id?.message}
                                />
                            )}

                            {statuses.length > 0 && (
                                <CustomSelect
                                    header="სტატუსი*"
                                    options={statuses}
                                    selectedOption={selectedStatus}
                                    onSelect={handleStatusSelect}
                                    error={errors.status_id?.message}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 w-[550px]">
                        <div className="grid grid-cols-1">
                            {departments.length > 0 && (
                                <CustomSelect
                                    header="დეპარტამენტი*"
                                    options={departments}
                                    selectedOption={selectedDepartment}
                                    onSelect={handleDepartmentSelect}
                                    error={errors.department_id?.message}
                                />
                            )}

                            <div className="pt-20">
                                {filteredEmployees.length > 0 && (
                                    <CustomSelect
                                        header="თანამშრომელი*"
                                        options={filteredEmployees.map(emp => ({
                                            id: emp.id,
                                            name: `${emp.name} ${emp.surname}`,
                                            icon: emp.avatar
                                        }))}
                                        selectedOption={selectedEmployee ? {
                                            id: selectedEmployee.id,
                                            name: `${selectedEmployee.name} ${selectedEmployee.surname}`,
                                            icon: selectedEmployee.avatar
                                        } : null}
                                        onSelect={handleEmployeeSelect}
                                        error={errors.employee_id?.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 pt-[150px]">
                            <CustomDateInput
                                header="შესრულების თარიღი*"
                                label={
                                    errors.due_date
                                        ? errors.due_date.message
                                        : "აირჩიეთ თარიღი"
                                }
                                register={register("due_date", {
                                    onChange: () => trigger("due_date")
                                })}
                                style={getInputStyle("due_date")}
                            />
                        </div>
                        {submitError && (
                            <div className="mt-6 p-3 bg-red-50 text-redtext rounded-md  track">
                                {submitError}
                            </div>
                        )}

                        <div className="flex justify-end pt-24">
                            <div>
                                <CustomButton
                                    title={isLoading ? "იტვირთება..." : "დავალების შექმნა"}
                                    fill
                                    style="rounded-md px-5 py-2.5"
                                    type="submit"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default TaskCreateForm;
