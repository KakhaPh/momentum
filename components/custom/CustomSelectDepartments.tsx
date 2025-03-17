import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectDepartmentsProps {
    departments: Department[];
    selectedDepartment: string;
    onSelect: (id: number, name: string) => void;
    error?: string;
}

const CustomSelectDepartments: React.FC<SelectDepartmentsProps> = ({
    departments,
    selectedDepartment,
    onSelect,
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef}>
            <label className="block text-sm font-medium text-headlines mb-1">დეპარტამენტი*</label>
            <div className="relative">
                <div
                    className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-redtext' : selectedDepartment ? 'border-greentext' : 'border-graysh'} bg-white flex justify-between items-center cursor-pointer`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={selectedDepartment ? "text-gray-900" : "text-graysh"}>
                        {selectedDepartment || "აირჩიეთ დეპარტამენტი"}
                    </span>
                    <ChevronDown className={`text-headlines transition-transform ${isOpen ? "transform rotate-180" : ""}`} size={20} />
                </div>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        <div className="py-1">
                            {departments.length > 0 ? (
                                departments.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${selectedDepartment === item.name ? 'bg-blue-100 text-blue-700' : 'text-headlines'}`}
                                        onClick={() => {
                                            onSelect(item.id, item.name);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-headlines italic">დეპარტამენტები არ მოიძებნა</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-redtext text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default CustomSelectDepartments;