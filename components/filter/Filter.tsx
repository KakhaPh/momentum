import React from 'react'
import DropDown from './Dropdown'
import Departaments from './Departments'
import Priorities from './Priorities'

const Filter = () => {
    return (
        <div className="grid grid-cols-3 w-[688px] h-11 rounded-[10px] border-[1px] border-bordercolor gap-[45px]">
            <DropDown title='დეპარტამენტი'>
                <Departaments />
            </DropDown>
            <DropDown title='პრიორიტეტი'>
                <Priorities />
            </DropDown>
            <DropDown title='თანამშრომელი'>

            </DropDown>
        </div>
    )
}

export default Filter