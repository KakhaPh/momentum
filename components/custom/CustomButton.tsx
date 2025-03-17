import React, { JSX } from "react";

interface ICustomButtonProps {
    title: string;
    onClick?: () => void;
    icon?: JSX.Element;
    fill?: boolean;
    style?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    title,
    onClick,
    icon,
    fill,
    style,
    type,
    disabled = false,
}) => {
    return (
        <button
            className={`${fill ? "flex items-center gap-1 bg-purpletext hover:bg-purplehover text-whitetext"
                : "border-[1px] border-purpletext hover:border-purplehover"} 
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                text-[16px] leading-none tracking-normal rounded-[5px] transition duration-200 whitespace-nowrap px-5 py-2.5 ${style}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {icon}
            {title}
        </button>
    );
};

export default CustomButton;