"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import CustomButton from "@/components/custom/CustomButton";
import EmployerModalForm from "./EmployerModalForm";

interface EmployerModalProps {
    onSuccess?: () => void;
}

const EmployerModal: React.FC<EmployerModalProps> = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
    };

    const closeModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <>
            <div onClick={openModal}>
                <CustomButton title="თანამშრომლის შექმნა" style="w-[225px] h-[39px]" type="button"/>
            </div>

            {isOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
                    <div
                        className={`bg-white w-[913px] h-fit px-[50px] pt-10 pb-[60px] rounded-lg shadow-xl transition-all duration-300 transform 
                        ${isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="flex justify-center items-center w-10 h-10 bg-grayshtwo rounded-full cursor-pointer hover:bg-graysh transition-colors"
                                type="button"
                            >
                                <X size={24} className="text-whitetext" />
                            </button>
                        </div>

                        <div className="flex justify-center mb-8">
                            <h2 className="text-[32px] font-medium text-headlines">თანამშრომლის შექმნა</h2>
                        </div>

                        <EmployerModalForm
                            onCancel={closeModal}
                            onSuccess={handleSuccess}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployerModal;