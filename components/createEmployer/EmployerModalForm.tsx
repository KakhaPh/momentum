"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "../custom/CustomInput";
import { request } from "../services/request";
import { fetchDepartments } from "../api/department";
import CustomSelectDepartments from "../custom/CustomSelectDepartments";
import CustomFileUpload from "../custom/CustomFileUpload";
import { CreateEmployeeFormSchema, EmployeeFormSchema } from "../Schema/CreateEmployerSchema";
import { Employee } from "../interfaces/Employee";
import { Department } from "../interfaces/Department";
import { X } from "lucide-react";

interface EmployerModalFormProps {
    onCancel: () => void;
    onSuccess?: () => void;
}

const EmployerModalForm: React.FC<EmployerModalFormProps> = ({ onCancel, onSuccess }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
        reset,
        trigger,
    } = useForm<EmployeeFormSchema>({
        resolver: zodResolver(CreateEmployeeFormSchema),
        mode: "onChange",
    });

    const [departments, setDepartments] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error("Failed fetching departments:", error);
            }
        };

        getDepartments();
    }, []);

    const handleDepartmentSelect = (id: number, name: string) => {
        setValue("department_id", id, { shouldValidate: true });

        setValue("department", name);

        trigger(["department_id", "department"]);
    };

    useEffect(() => {
        const savedFormString = sessionStorage.getItem("employeesForm");
        if (!savedFormString) return;

        try {
            const savedForm = JSON.parse(savedFormString);
            const { ...restOfForm } = savedForm;
            Object.entries(restOfForm).forEach(([key, value]) => {
                if (value !== undefined) {
                    setValue(key as keyof EmployeeFormSchema, value as Employee);
                }
            });
        } catch (error) {
            console.error("Error parsing saved form data:", error);
            sessionStorage.removeItem("employeesForm");
        }
    }, []);

    const watchAllFields = watch();

    useEffect(() => {
        if (!isDirty) return;

        const formData = { ...watchAllFields };

        if (formData.avatar instanceof File) {
            const { ...rest } = formData;
            sessionStorage.setItem("employeesForm", JSON.stringify(rest));
        } else {
            sessionStorage.setItem("employeesForm", JSON.stringify(formData));
        }
    }, [watchAllFields, isDirty]);

    const getInputStyle = (fieldName: keyof EmployeeFormSchema) => {
        const value = watch(fieldName);

        if (errors[fieldName]) {
            return "error";
        } else if (value) {
            return "success";
        } else {
            return "default";
        }
    };

    const onSubmit: SubmitHandler<EmployeeFormSchema> = async (data) => {
        setIsLoading(true);
        setSubmitError(null);
        const formData = new FormData();

        try {
            formData.append("name", data.name);
            formData.append("surname", data.surname);
            if (data.avatar.length > 0) {
                formData.append("avatar", data.avatar[0]);
            }
            formData.append("department_id", data.department_id.toString());

            await request.post("employees", formData);

            sessionStorage.removeItem("employeesForm");

            setShowSuccessAlert(true);

            setTimeout(() => {
                setShowSuccessAlert(false);
                reset();
                onCancel();
                if (onSuccess) {
                    onSuccess();
                }
            }, 3000);

        } catch (error) {
            console.error("Error submitting employee data:", error);
            setSubmitError("Error creating employee. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        sessionStorage.removeItem("employeesForm");
        reset();
        onCancel();
    };

    return (
        <>
            {showSuccessAlert && (
                <div className="mb-4 p-3 bg-greentext/10 text-greentext rounded-md flex justify-between items-center">
                    <span>თანამშრომელი წარმატებით დაემატა!</span>
                    <button
                        onClick={() => setShowSuccessAlert(false)}
                        className="text-greentext"
                    >
                        <X size={24} className="text-greentext" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <CustomInput
                        header="სახელი*"
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

                    <CustomInput
                        header="გვარი*"
                        register={register("surname", {
                            onChange: () => trigger("surname")
                        })}
                        style={getInputStyle("surname")}
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

                <div className="mt-6 mb-6">
                    <CustomFileUpload
                        header={"ატვირთეთ ფოტო*"}
                        register={register("avatar")}
                    />
                </div>

                <div className="mt-6">
                    <CustomSelectDepartments
                        departments={departments}
                        selectedDepartment={watch("department")}
                        onSelect={handleDepartmentSelect}
                        error={!!errors.department ? " " : undefined}
                    />
                </div>

                {submitError && (
                    <div className="mt-4 p-3 bg-red-50 text-redtext rounded-md">
                        {submitError}
                    </div>
                )}

                <div className="mt-10 flex justify-end space-x-4">
                    <div onClick={handleCancel}>
                        <CustomButton title="გაუქმება" style="px-6 py-2 transition-colors" />
                    </div>
                    <div>
                        <CustomButton
                            title={isLoading ? "იტვირთება..." : "დამატება"}
                            fill
                            style="px-6 py-2"
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default EmployerModalForm;