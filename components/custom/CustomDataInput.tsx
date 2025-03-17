import { Check } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomDateInputProps {
    header: string;
    label: string | undefined;
    register: UseFormRegisterReturn;
    style?: "default" | "error" | "success";
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
    header,
    label,
    register,
    style = "default"
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-headlines">{header}</p>
            <div className="relative">
                <input
                    type="date"
                    className={`p-2.5 rounded-md border-[1px] outline-none appearance-none w-full bg-white
                            ${style === "default" && "border-graysh"}
                            ${style === "error" && "border-redtext"}
                            ${style === "success" && "border-greentext"}
                            `}
                    {...register}
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>
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

export default CustomDateInput;