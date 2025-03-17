import { Check } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomTextAreaProps {
    header: string;
    label: string | undefined;
    register: UseFormRegisterReturn;
    style?: "default" | "error" | "success";
    rows?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
    header,
    label,
    register,
    style = "default",
    rows = 4
}) => {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-headlines">{header}</p>
            <textarea
                className={`p-2.5 rounded-md border-[1px] outline-none appearance-none bg-white
                        ${style === "default" && "border-graysh"}
                        ${style === "error" && "border-redtext"}
                        ${style === "success" && "border-greentext"}
                        `}
                rows={rows}
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

export default CustomTextArea;