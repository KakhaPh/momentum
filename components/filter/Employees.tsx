"use client";

import React, { useEffect, useState } from "react";
import CustomButton from "../custom/CustomButton";
import { fetchEmployees } from "../api/employees";
import CustomCheckbox from "../custom/CustomCheckboxe";

const Employees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getEmployees = async () => {
            try {
                setIsLoading(true);
                const data = await fetchEmployees();
                setEmployees(data);
            } catch (error) {
                setError('Failed to fetch employees');
            } finally {
                setIsLoading(false);
            }
        };

        getEmployees();
    }, []);

    const handleCheckboxChange = (employeeId: number) => {
        setCheckedState(prev => ({
            ...prev,
            [employeeId]: !prev[employeeId]
        }));
    };

    const getSelectedCount = () => {
        return Object.values(checkedState).filter(Boolean).length;
    }

    if (error) return <>{error}</>
    if (isLoading) return <>Loading employees...</>

    return (
        <div className="absolute min-w-[688px] mt-[5px] flex flex-col gap-1 border-[1px] border-purpletext rounded-md bg-white z-10">
            <div className="gap-2 min-h-[165px]">
                {employees.map((employee) => (
                    <div key={employee.id} className="p-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <CustomCheckbox
                                avatar={employee.avatar}
                                title={`${employee.name} ${employee.surname}`}
                                checked={!!checkedState[employee.id]}
                                onChange={() => handleCheckboxChange(employee.id)}
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

export default Employees;