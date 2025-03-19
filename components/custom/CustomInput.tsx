import { Check } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

interface Requirement {
    id: string;
    label: string;
    validator: (value: any) => boolean;
}

interface CustomInputProps {
    header: string;
    register: UseFormRegisterReturn;
    style?: "default" | "error" | "success";
    type?: string;
    requirements?: Requirement[];
}

const CustomInput: React.FC<CustomInputProps> = ({
    header,
    register,
    style = "default",
    type = "text",
    requirements
}) => {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        register.onChange(e);

        if (!touched && newValue.length > 0) {
            setTouched(true);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setTouched(true);
        if (register.onBlur) {
            register.onBlur(e);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-headlines">{header}</p>
            <input
                type={type}
                className={`p-2.5 rounded-md border-[1px] outline-none appearance-none bg-white
                        ${style === "default" && "border-graysh"}
                        ${style === "error" && "border-redtext"}
                        ${style === "success" && "border-greentext"}
                        `}
                {...register}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            {requirements && (
                <div className="flex flex-col gap-1">
                    {requirements.map((req) => {
                        const isValid = req.validator(value);
                        const textColor = !touched ? "text-headlines" :
                            isValid ? "text-greentext" : "text-redtext";
                        const iconColor = !touched ? "text-greytext" :
                            isValid ? "text-greentext" : "text-redtext";

                        return (
                            <div
                                key={req.id}
                                className={`text-[10px] leading-[100%] tracking-normal flex items-center gap-1 ${textColor}`}
                            >
                                <Check size={16} className={`font-bold ${iconColor}`} />
                                {req.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CustomInput;