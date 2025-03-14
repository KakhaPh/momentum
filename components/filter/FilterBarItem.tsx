"use client";

import React from "react";
import { XIcon } from "lucide-react";

type FilterBar = {
	header: string;
	onRemove: () => void;
};

const FilterBarItem: React.FC<FilterBar> = ({ header, onRemove }) => {
    return (
        <div className="flex gap-1 items-center rounded-[43px] border-[1px] border-grayshthree px-1.5 py-0">
            <span className="flex text-headlines text-[14px] leading-[100%] items-center">{header}</span>
            <XIcon
                width={12}
                className="cursor-pointer"
                onClick={onRemove}
            />
        </div>
    );
};

export default FilterBarItem;
