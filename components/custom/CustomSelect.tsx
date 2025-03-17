import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";

interface Option {
    id: number;
    name: string;
    icon?: string;
}

interface CustomSelectProps {
    header: string;
    placeholder?: string;
    options: Option[];
    selectedOption?: Option | null;
    onSelect: (id: number, name: string) => void;
    error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    header,
    placeholder = "აირჩიეთ",
    options,
    selectedOption,
    onSelect,
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(selectedOption || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedOption) {
            setSelected(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (option: Option) => {
        setSelected(option);
        onSelect(option.id, option.name);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-headlines">{header}</p>
            <div ref={dropdownRef} className="relative bg-white">
                <div
                    className={`p-2.5 rounded-md border-[1px] outline-none appearance-none flex justify-between items-center cursor-pointer
                        ${!error ? "border-graysh" : "border-redtext"}
                        ${selected ? "text-black" : "text-gray-400"}
                    `}
                    onClick={() => setIsOpen(!isOpen)}
                >   
                    <span>
                        {selected ? (
                            <div className="flex">
                                {selected.icon && <Image src={selected.icon} width={20} height={20} alt="icon" className="rounded-full h-6 w-6 object-cover object-top mr-2" />}
                                {selected.name}
                            </div>
                        ) : (
                            placeholder
                        )}
                    </span>
                    <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-graysh rounded-md shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center p-2.5 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelect(option)}
                            >
                                {option.icon && 
                                    <Image src={option.icon} width={20} height={20} alt="icon" className="rounded-full h-7 w-7 object-cover object-top mr-4" />
                                }
                                <span className={selected?.id === option.id ? "font-medium" : ""}>{option.name}</span>
                                {selected?.id === option.id && <Check size={16} className="ml-auto text-greentext" />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error && (
                <div className="text-sm flex items-center gap-2 text-redtext">
                    <Check size={20} className="font-bold text-greytext" />
                    {error}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;