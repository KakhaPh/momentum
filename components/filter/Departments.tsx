"use client";

import React, { useContext, useEffect, useState } from "react";
import { fetchDepartments } from "../api/department";
import CustomCheckbox from "../custom/CustomCheckbox";
import CustomButton from "../custom/CustomButton";
import { FilterContext } from "../context/FilterContext";
import { Department } from "../interfaces/Department";

const Departments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                setIsLoading(true);
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error("Error", error)
                setError('Failed to fetch Departments');
            } finally {
                setIsLoading(false);
            }
        };

        getDepartments();
    }, []);

    const { selectedDepartments, setSelectedDepartments } = useContext(FilterContext);
    const [chooseDepartments, setChoosenDepartments] = useState<string[]>([]);

    const handleDepartmentSelection = (departmentId: number, departmentName: string) => {
        setCheckedState(prev => ({
            ...prev,
            [departmentId]: !prev[departmentId]
        }));

        setChoosenDepartments(prev =>
            prev.includes(departmentName)
                ? prev.filter(name => name !== departmentName)
                : [...prev, departmentName]
        );
    };

    const getSelectedCount = () => {
        return Object.values(checkedState).filter(Boolean).length;
    };

    const onSubmit = () => {
        setSelectedDepartments(chooseDepartments);
        console.log(selectedDepartments);
    };

    if (error) return <div className="text-redtext p-4">{error}</div>;

    return (
        <div className="absolute min-w-[688px] min-h-[467px] mt-[5px] flex flex-col gap-1 border-[1px] border-purpletext rounded-md bg-white z-10">
            {isLoading ? (
                <div className="flex justify-center items-center h-[467px]">
                    <div className="text-center p-8">
                        <div className="w-12 h-12 border-4 border-purpletext/20 border-t-purpletext rounded-full animate-spin mb-4 mx-auto"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="gap-2 min-h-[400px] max-h-[500px] overflow-y-auto">
                        {departments?.map((department) => (
                            <div key={department.id} className="p-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <CustomCheckbox
                                        title={department.name}
                                        checked={!!checkedState[department.id]}
                                        onSelect={() => handleDepartmentSelection(department.id, department.name)}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center p-3 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            {getSelectedCount()} არჩეული
                        </div>
                        <CustomButton
                            title={'არჩევა'}
                            fill
                            onClick={onSubmit}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Departments;