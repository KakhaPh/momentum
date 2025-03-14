import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CustomCheckboxProps {
    title: string;
    avatar?: string;
    checked: boolean;
    onSelect: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ title, avatar, checked, onSelect }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="relative inline-block">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onSelect}
                    className="sr-only"
                />
                <div 
                    onClick={onSelect}
                    className={`w-5 h-5 border border-purpletext cursor-pointer rounded-md flex items-center justify-center ${checked ? 'bg-white' : 'bg-white'}`}
                >
                    {checked && <Check className="w-4 h-4 text-purpletext" />}
                </div>
            </div>
            {avatar && (
                <Image
                    src={avatar}
                    alt={title}
                    height={28}
                    width={28}
                    className="rounded-full h-7 w-7 object-cover object-top"
                />
            )}
            <span>{title}</span>
        </div>
    );
};

export default CustomCheckbox;
