"use client";

import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../api/department";
import CustomCheckbox from "../custom/CustomCheckboxe";
import CustomButton from "../custom/CustomButton";

interface Department {
    id: number;
    name: string;
}

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
                setError('Failed to fetch Departments');
            } finally {
                setIsLoading(false);
            }
        };

        getDepartments();
    }, []);

    const handleCheckboxChange = (departmentId: number) => {
        setCheckedState(prev => ({
            ...prev,
            [departmentId]: !prev[departmentId]
        }));
    };

    const getSelectedCount = () => {
        return Object.values(checkedState).filter(Boolean).length;
    };

    if (error) return <div className="text-red-500 p-4">{error}</div>;
    if (isLoading) return <div className="p-4">Loading departments...</div>;

    return (
        <div className="absolute min-w-[688px] mt-[5px] flex flex-col gap-1 border-[1px] border-purpletext rounded-md bg-white z-10">
            <div className="gap-2 min-h-[400px] max-h-[500px] overflow-y-auto">
                {departments.map((department) => (
                    <div key={department.id} className="p-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <CustomCheckbox
                                title={department.name}
                                checked={!!checkedState[department.id]}
                                onChange={() => handleCheckboxChange(department.id)}
                            />
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center p-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                    {getSelectedCount()} selected
                </div>
                <CustomButton
                    title={'არჩევა'}
                    fill
                />
            </div>
        </div>
    );
};

export default Departments;