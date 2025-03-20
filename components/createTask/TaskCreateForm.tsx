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
import { Status } from "../interfaces/Status";
import { Priority } from "../interfaces/Priority";
import { Department } from "../interfaces/Department";
import { Employee } from "../interfaces/Employee";
import { X } from "lucide-react";
import { useModal } from "../context/ModalContext";

interface TaskCreateFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
}

const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSuccess }) => {
    const router = useRouter();
    const { openEmployerModal } = useModal();

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

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [emplByDept, setEmplByDept] = useState<Employee[]>([]);

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

                if (prioritiesData.length >= 0) {
                    setValue("priority_id", prioritiesData[1].id);
                }

                if (statusesData.length >= 0) {
                    setValue("status_id", statusesData[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            }
        };

        fetchInitialData();
    }, [setValue]);

    const handleAddEmployee = () => {
        openEmployerModal();
    };

    useEffect(() => {
        const savedFormString = sessionStorage.getItem("taskForm");
        if (!savedFormString) return;

        try {
            const savedForm = JSON.parse(savedFormString);
            Object.entries(savedForm).forEach(([key, value]) => {
                if (value !== undefined) {
                    setValue(key as keyof TaskSchema, value as TaskSchema[keyof TaskSchema]);
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
        setValue("employee_id", 0, { shouldValidate: false });

        if (id && employees.length > 0) {
            const filteredEmployees = employees.filter(emp => emp.department.id === id)
            setEmplByDept(filteredEmployees);
        } else {
            setEmplByDept([]);
        }
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

            setShowSuccessAlert(true);

            setTimeout(() => {
                reset();
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push('/');
                }
            }, 3000);
        } catch (error) {
            console.error("Error submitting task data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const selectedStatus = statuses.find(s => s.id === watch("status_id")) || null;
    const selectedPriority = priorities.find(p => p.id === watch("priority_id")) || null;
    const selectedDepartment = departments.find(d => d.id === watch("department_id")) || null;
    const selectedEmployee = employees.find(e => e.id === watch("employee_id")) || null;

    return (
        <>
            {showSuccessAlert && (
                <div className="mb-4 p-3 bg-greentext/10 text-greentext rounded-md flex justify-between items-center">
                    <span>ახალი დავალება წარმატებით დაემატა!</span>
                    <button
                        onClick={() => setShowSuccessAlert(false)}
                        className="text-greentext"
                    >
                        <X size={24} className="text-greentext" />
                    </button>
                </div>
            )}
            <div className="flex flex-col border-[0.3px] border-purplebg rounded-sm bg-[#f9f7fd] w-full min-h-[958px] p-4 md:p-8 lg:p-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row pt-4 lg:pt-4 px-2 gap-6 lg:gap-40">
                        <div className="flex flex-col gap-6 w-full lg:w-[550px]">
                            <CustomInput
                                header="სათაური*"
                                register={register("name", {
                                    onChange: () => trigger("name")
                                })}
                                style={getInputStyle("name")}
                                requirements={[
                                    {
                                        id: "min-length",
                                        label: "მინიმუმ 2 სიმბოლო",
                                        validator: (value) => value?.length >= 2,
                                    },
                                    {
                                        id: "max-length",
                                        label: "მაქსიმუმ 255 სიმბოლო",
                                        validator: (value) => value?.length <= 255,
                                    },
                                ]}
                            />
                            <div className="pt-4 lg:pt-0">
                                <CustomTextArea
                                    header="აღწერა*"
                                    register={register("description", {
                                        onChange: () => trigger("description")
                                    })}
                                    style={getInputStyle("description")}
                                    rows={4}
                                    requirements={[
                                        {
                                            id: "min-length",
                                            label: "მინიმუმ 2 სიმბოლო",
                                            validator: (value) => value?.length >= 2,
                                        },
                                        {
                                            id: "max-length",
                                            label: "მაქსიმუმ 255 სიმბოლო",
                                            validator: (value) => value?.length <= 255,
                                        },
                                    ]}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-6 lg:pt-12">
                                <CustomSelect
                                    header="პრიორიტეტი*"
                                    options={priorities}
                                    selectedOption={selectedPriority}
                                    onSelect={handlePrioritySelect}
                                    error={errors.priority_id?.message}
                                />

                                <CustomSelect
                                    header="სტატუსი*"
                                    options={statuses}
                                    selectedOption={selectedStatus}
                                    onSelect={handleStatusSelect}
                                    error={errors.status_id?.message}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 w-full lg:w-[550px] mt-6 lg:mt-0">
                            <div className="grid grid-cols-1 h-[300px]">
                                <CustomSelect
                                    header="დეპარტამენტი*"
                                    options={departments}
                                    selectedOption={selectedDepartment}
                                    onSelect={handleDepartmentSelect}
                                    error={errors.department_id?.message}
                                />

                                <CustomSelect
                                    header="თანამშრომელი*"
                                    options={emplByDept.map(emp => ({
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
                                    disabled={!selectedDepartment}
                                    className={`${!selectedDepartment ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    addButtonText="დაამატე თანამშრომელი"
                                    showAddButton
                                    onAddNew={handleAddEmployee}
                                    error={errors.employee_id?.message}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 pt-6 lg:pt-[90px]">
                                <CustomDateInput
                                    header="შესრულების თარიღი*"
                                    register={register("due_date", {
                                        onChange: () => trigger("due_date")
                                    })}
                                    style={getInputStyle("due_date")}
                                    requirements={[
                                        {
                                            id: "select-date",
                                            label: "აირჩიეთ თარიღი",
                                            validator: (value) => value?.trim() !== "",
                                        },
                                    ]}
                                />
                            </div>
                            {submitError && (
                                <div className="mt-4 lg:mt-6 p-3 bg-red-50 text-redtext rounded-md track">
                                    {submitError}
                                </div>
                            )}

                            <div className="flex justify-end pt-8 lg:pt-24">
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
        </>
    );
};
export default TaskCreateForm;