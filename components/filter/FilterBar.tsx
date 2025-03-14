"use client";

import { useContext } from "react";
import FilterBarItem from "./FilterBarItem";
import { FilterContext } from "../context/FilterContext";

interface FilterBarProps {
    selectedDepartments: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
    selectedDepartments,
}) => {
    const {
        setSelectedDepartments,

        cleanBar,
    } = useContext(FilterContext);


    const removeDepartmentFilter = (deprt: string) => {
        setSelectedDepartments((prev: string[]) =>
            prev.filter((r) => r !== deprt)
        );
    };

    const hasActiveFilters =
        selectedDepartments.length > 0;
    return (
        <div className="flex items-center gap-2">
			{selectedDepartments.map((deprt) => (
				<FilterBarItem
					key={deprt}
					header={deprt}
					onRemove={() => removeDepartmentFilter(deprt)}
				/>
			))}

			{hasActiveFilters && (
				<p
					className="text-darktext text-[14px] font-medium text-center cursor-pointer"
					onClick={cleanBar}
				>
					გასუფთავება
				</p>
			)}
        </div>
    );
};

export default FilterBar;
