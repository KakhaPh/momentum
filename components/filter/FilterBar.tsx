"use client";

import { useContext } from "react";
import FilterBarItem from "./FilterBarItem";
import { FilterContext } from "../context/FilterContext";

interface FilterBarProps {
    selectedDepartments: string[];
    selectedPriorities: string[];
    selectedEmployees: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
    selectedDepartments,
    selectedPriorities,
    selectedEmployees
}) => {
    const {
        setSelectedDepartments,
        setSelectedPriorities,
        setSelectedEmployees,
        cleanBar,
    } = useContext(FilterContext);


    const removeDepartmentFilter = (deprt: string) => {
        setSelectedDepartments((prev: string[]) =>
            prev.filter((r) => r !== deprt)
        );
    };

    const removePriorityFilter = (prty: string) => {
        setSelectedPriorities((prev: string[]) =>
            prev.filter((r) => r !== prty)
        );
    };

    const removeEmployeesFilter = (empl: string) => {
        setSelectedEmployees((prev: string[]) =>
            prev.filter((r) => r !== empl)
        );
    };

    const hasActiveFilters =
        selectedDepartments.length > 0 || 
        selectedPriorities.length > 0  ||
        selectedEmployees.length > 0;
    return (
        <div className="flex items-center gap-2">
			{selectedDepartments.map((deprt) => (
				<FilterBarItem
					key={deprt}
					header={deprt}
					onRemove={() => removeDepartmentFilter(deprt)}
				/>
			))}

			{selectedPriorities.map((prty) => (
				<FilterBarItem
					key={prty}
					header={prty}
					onRemove={() => removePriorityFilter(prty)}
				/>
			))}

			{selectedEmployees.map((empl) => (
				<FilterBarItem
					key={empl}
					header={empl}
					onRemove={() => removeEmployeesFilter(empl)}
				/>
			))}

			{hasActiveFilters && (
				<p
					className="text-subheadlines text-[14px] leading-[100%] font-medium text-center cursor-pointer"
					onClick={cleanBar}
				>
					გასუფთავება
				</p>
			)}
        </div>
    );
};

export default FilterBar;
