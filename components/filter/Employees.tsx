"use client";

import React, { useContext, useEffect, useState } from "react";
import CustomButton from "../custom/CustomButton";
import { fetchEmployees } from "../api/employees";
import CustomCheckbox from "../custom/CustomCheckbox";
import { FilterContext } from "../context/FilterContext";
import { Employee } from "../interfaces/Employee";

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
                console.error("Failed", error);
                setError('Failed to fetch employees');
            } finally {
                setIsLoading(false);
            }
        };

        getEmployees();
    }, []);

    const { selectedEmployees, setSelectedEmployees } = useContext(FilterContext);
    const [chooseEmployees, setChoosenEmployees] = useState<string[]>([]);

    const handleEmployeesSelection = (departmentId: number, departmentName: string) => {
        setCheckedState(prev => ({
            ...prev,
            [departmentId]: !prev[departmentId]
        }));

        setChoosenEmployees(prev =>
            prev.includes(departmentName)
                ? prev.filter(name => name !== departmentName)
                : [...prev, departmentName]
        );
    };

    const getSelectedCount = () => {
        return Object.values(checkedState).filter(Boolean).length;
    };

    const onSubmit = () => {
        setSelectedEmployees(chooseEmployees);
        console.log(selectedEmployees);
    };


    if (error) return <div className="text-redtext p-4">{error}</div>;


    return (
        <div className="absolute min-w-[688px] min-h-[234px] mt-[5px] flex flex-col gap-1 border-[1px] border-purpletext rounded-md bg-white z-10">
            {isLoading ? (
                <div className="flex justify-center items-center h-[234px]">
                    <div className="text-center p-8">
                        <div className="w-12 h-12 border-4 border-purpletext/20 border-t-purpletext rounded-full animate-spin mb-4 mx-auto"></div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="gap-2 min-h-[165px]">
                        {employees.map((employee) => (
                            <div key={employee.id} className="p-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <CustomCheckbox
                                        avatar={employee.avatar}
                                        title={`${employee.name} ${employee.surname}`}
                                        checked={!!checkedState[employee.id]}
                                        onSelect={() => handleEmployeesSelection(employee.id, employee.name)}
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
                            onClick={onSubmit}
                        />
                    </div>
                </>
            )}

        </div>
    );
};

export default Employees;