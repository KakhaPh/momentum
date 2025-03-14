"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

type TypeFilterContext = {
    selectedDepartments: string[];
    setSelectedDepartments: React.Dispatch<React.SetStateAction<string[]>>;
    cleanBar: () => void;
};

const CONTEXT_DEFAULT_VALUE: TypeFilterContext = {
    selectedDepartments: [],
    setSelectedDepartments: () => { },
    cleanBar: () => { },
};

export const FilterContext = createContext<TypeFilterContext>(
    CONTEXT_DEFAULT_VALUE
);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDepartments = sessionStorage.getItem("selectedDepartments");
            if (savedDepartments) {
                setSelectedDepartments(JSON.parse(savedDepartments));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("selectedDepartments", JSON.stringify(selectedDepartments));
        }
    }, [selectedDepartments]);

    const cleanBar = () => {
        setSelectedDepartments([]);
    };

    return (
        <FilterContext.Provider
            value={{
                selectedDepartments,
                setSelectedDepartments,
                cleanBar
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};