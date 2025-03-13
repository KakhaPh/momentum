
import React from 'react';

interface CustomCheckboxProps {
    title: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ title, checked, onChange }) => {
    return (
        <>
            <div className="relative inline-block">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div className={`w-5 h-5 border border-black cursor-pointer rounded-md flex items-center justify-center ${checked ? 'bg-white' : 'bg-white'}`}>
                    {checked && (
                        <svg
                            className="w-4 h-4 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <span>{title}</span>
        </>
    );
};

export default CustomCheckbox;