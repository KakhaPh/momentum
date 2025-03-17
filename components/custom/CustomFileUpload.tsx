"use client";

import { Camera, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ICustomFileUploadProps {
    header: string;
    style?: "default" | "error" | "success";
    onFileChange?: (file: File | null) => void;
    label?: string | null;
    register?: UseFormRegisterReturn;
}

const CustomFileUpload: React.FC<ICustomFileUploadProps> = ({
    header,
    style = "default",
    onFileChange,
    register,
    label,
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            if (onFileChange) {
                onFileChange(file);
            }
        } else {
            setImagePreview(null);
            if (onFileChange) {
                onFileChange(null);
            }
        }

        if (register?.onChange) {
            register.onChange(event);
        }
    };

    const styleClasses = {
        default: "!border-[#808A93]",
        error: "!border-redtext",
        success: "!border-greentext",
    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="medium-text">{header}</h1>
            <label htmlFor="dropzone-file">
                <div
                    className={`w-full h-[120px] border-2 border-dashed rounded-md flex items-center justify-center relative overflow-hidden ${styleClasses[style]}`}
                >
                    {imagePreview ? (
                        <div className="relative">
                            <Image
                                src={imagePreview}
                                width={100}
                                height={100}
                                alt="Avatar Preview"
                                className="w-[88px] h-[88px] object-cover"
                            />
                            <div className="absolute bottom-1 right-1 shadow-xs bg-white text-graysh p-1 rounded-full cursor-pointer">
                                <Trash2 size={16} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center cursor-pointer" >
                            <Camera size={48} className="text-graysh mb-2" />
                            <p className="text-sm text-headlines">
                                აირჩიეთ სურათი ან ჩააგდეთ აქ
                            </p>
                        </div>
                    )}

                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        {...(register
                            ? { ...register, onChange: undefined }
                            : {})}
                        onChange={handleFileChange}
                    />
                </div>
            </label>

            {label && (
                <span
                    className={`text-sm ${style === "default"
                        ? "text-headlines"
                        : style === "error"
                            ? "!text-redtext"
                            : "!text-greentext"
                        }`}
                >
                    {label}
                </span>
            )}
        </div>
    );
};

export default CustomFileUpload;
