import { Check } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
    header: string;
    label: string | undefined;
    register: UseFormRegisterReturn;
    style?: "default" | "error" | "success";
    type?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    header,
    label,
    register,
    style = "default",
    type
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-headlines">{header}</p>
            <input
                type={type}
                className={`p-2.5 rounded-md border-[1px] outline-none appearance-none
                        ${style === "default" && "border-graysh"}
                        ${style === "error" && "border-redtext"}
                        ${style === "success" && "border-greentext"}
                        `}
                {...register}
            />
            <div className={`text-sm flex items-center gap-2
						${style === "default" && "text-headlines"}
						${style === "error" && "text-redtext"} 
						${style === "success" && "text-greentext"}`}
            >
                <Check size={20} className="font-bold text-greytext" />
                {label}
            </div>
        </div>
    );
}
export default CustomInput;