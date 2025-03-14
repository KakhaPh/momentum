"use client";

import React, { useContext, useEffect, useState } from "react";
import CustomCheckbox from "../custom/CustomCheckbox";
import CustomButton from "../custom/CustomButton";
import { fetchPriorities } from "../api/priorities";
import { FilterContext } from "../context/FilterContext";


const Priorities = () => {
    const [Priorities, setPriorities] = useState<Priority[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPriorities = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPriorities();
                setPriorities(data);
            } catch (error) {
                setError('Failed to fetch Priorities');
            } finally {
                setIsLoading(false);
            }
        };

        getPriorities();
    }, []);
const { selectedPriorities, setSelectedPriorities } = useContext(FilterContext);
    const [choosePriselectedPriorities, setChoosenPriselectedPriorities] = useState<string[]>([]);

    const handlePrioritySelection = (departmentId: number, departmentName: string) => {
        setCheckedState(prev => ({
            ...prev,
            [departmentId]: !prev[departmentId]
        }));

        setChoosenPriselectedPriorities(prev =>
            prev.includes(departmentName)
                ? prev.filter(name => name !== departmentName)
                : [...prev, departmentName]
        );
    };

    const getSelectedCount = () => {
        return Object.values(checkedState).filter(Boolean).length;
    }

    const onSubmit = () => {
        setSelectedPriorities(choosePriselectedPriorities)
    };

    if (error) return <>{error}</>
    if (isLoading) return <>Loading Priorities...</>
    return (
        <div className="absolute min-w-[688px] mt-[5px] flex flex-col gap-1 border-[1px] border-purpletext rounded-md bg-white z-10">
            <div className="gap-2 min-h-[165px]">
                {Priorities.map((priority) => (
                    <div key={priority.id} className="p-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <CustomCheckbox
                                title={priority.name}
                                checked={!!checkedState[priority.id]}
                                onSelect={() => handlePrioritySelection(priority.id, priority.name)}
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
        </div>
    );
};

export default Priorities;
