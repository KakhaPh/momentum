"use client";
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import CustomButton from "@/components/custom/CustomButton";
import EmployerModalForm from "./EmployerModalForm";
import { useModal } from "../context/ModalContext";

interface EmployerModalProps {
    buttonTitle?: string;
    buttonStyle?: string;
    buttonType?: "button" | "submit" | "reset";
    renderButton?: boolean;
}

const EmployerModal: React.FC<EmployerModalProps> = ({
    buttonTitle = "თანამშრომლის შექმნა",
    buttonStyle = "w-[225px] h-[39px]",
    buttonType = "button",
    renderButton = true
}) => {
    const { isEmployerModalOpen, openEmployerModal, closeEmployerModal, refreshEmployees } = useModal();
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEmployerModalOpen) {
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isEmployerModalOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isEmployerModalOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEmployerModalOpen]);

    const handleOpen = () => {
        openEmployerModal();
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            closeEmployerModal();
        }, 300);
    };

    const handleSuccess = () => {
        refreshEmployees();
        handleClose();
    };

    return (
        <>
            {renderButton && (
                <div onClick={handleOpen}>
                    <CustomButton
                        title={buttonTitle}
                        style={buttonStyle}
                        type={buttonType}
                    />
                </div>
            )}

            {isEmployerModalOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
                    <div
                        ref={modalRef}
                        className={`bg-white w-[913px] h-fit px-[50px] pt-10 pb-[60px] rounded-lg shadow-xl transition-all duration-300 transform 
            ${isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={handleClose}
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
                            onCancel={handleClose}
                            onSuccess={handleSuccess}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployerModal;