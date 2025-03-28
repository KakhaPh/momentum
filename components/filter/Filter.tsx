"use client";

import React, { useContext } from 'react'
import DropDown from '../common/Dropdown'
import Departaments from './Departments'
import Priorities from './Priorities'
import Employees from './Employees'
import FilterBar from './FilterBar';
import { FilterContext } from '../context/FilterContext';

const Filter = () => {
    const { selectedDepartments, selectedPriorities, selectedEmployees } = useContext(FilterContext);

    return (
        <>
            <div className="grid grid-cols-3 w-[688px] h-11 rounded-[10px] border-[1px] border-bordercolor gap-[45px]">
                <DropDown title='დეპარტამენტი'>
                    <Departaments />
                </DropDown>
                <DropDown title='პრიორიტეტი'>
                    <Priorities />
                </DropDown>
                <DropDown title='თანამშრომელი'>
                    <Employees />
                </DropDown>
            </div>
            <div className="pt-8 h-[29px]">
                <FilterBar
                    selectedDepartments={selectedDepartments}
                    selectedPriorities={selectedPriorities}
                    selectedEmployees={selectedEmployees}
                />
            </div>
        </>
    )
}

export default Filter