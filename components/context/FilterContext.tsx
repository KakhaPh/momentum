"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type TypeFilterContext = {
    selectedDepartments: string[];
    selectedPriorities: string[];
    selectedEmployees: string[];
    setSelectedDepartments: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedPriorities: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedEmployees: React.Dispatch<React.SetStateAction<string[]>>;
    cleanBar: () => void;
};

const CONTEXT_DEFAULT_VALUE: TypeFilterContext = {
    selectedDepartments: [],
    selectedPriorities: [],
    selectedEmployees: [],
    setSelectedDepartments: () => { },
    setSelectedPriorities: () => { },
    setSelectedEmployees: () => { },
    cleanBar: () => { },
};

export const FilterContext = createContext<TypeFilterContext>(
    CONTEXT_DEFAULT_VALUE
);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDepartments = sessionStorage.getItem("selectedDepartments");
            const savedPriorities = sessionStorage.getItem("selectedPriorities");
            const savedEmployees = sessionStorage.getItem("selectedEmployees");
            if (savedDepartments) {
                setSelectedDepartments(JSON.parse(savedDepartments));
            }
            if (savedPriorities) {
                setSelectedPriorities(JSON.parse(savedPriorities));
            }
            if (savedEmployees) {
                setSelectedEmployees(JSON.parse(savedEmployees));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("selectedDepartments", JSON.stringify(selectedDepartments));
            sessionStorage.setItem("selectedPriorities", JSON.stringify(selectedPriorities));
            sessionStorage.setItem("selectedEmployees", JSON.stringify(selectedEmployees));
        }
    }, [selectedDepartments, selectedEmployees, selectedPriorities]);

    const cleanBar = () => {
        setSelectedDepartments([]);
        setSelectedPriorities([]);
        setSelectedEmployees([]);
    };

    return (
        <FilterContext.Provider
            value={{
                selectedDepartments,
                selectedPriorities,
                selectedEmployees,
                
                setSelectedDepartments,
                setSelectedPriorities,
                setSelectedEmployees,
                cleanBar
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};