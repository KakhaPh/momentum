import React, { JSX } from "react";

interface ICustomButtonProps {
    title: string;
    onClick?: () => void;
    icon?: JSX.Element;
    fill?: boolean;
    style?: string;
    type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    title,
    onClick,
    icon,
    fill,
    style,
    type,
}) => {
    return (
        <button
            className={`${fill ? "flex items-center gap-1 bg-purpletext hover:bg-purplehover text-whitetext"
                : "border-[1px] border-purpletext hover:border-purplehover"} 
                "text-[16px] leading-none tracking-normal rounded-[5px]  transition duration-200 whitespace-nowrap cursor-pointer px-5 py-2.5 ${style}"`}
            onClick={onClick}
            type={type}
        >
            {icon}
            {title}
        </button>
    );
};

export default CustomButton;
