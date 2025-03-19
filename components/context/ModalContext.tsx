"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    isEmployerModalOpen: boolean;
    openEmployerModal: () => void;
    closeEmployerModal: () => void;
    refreshEmployees: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
    onEmployeeCreated?: () => void;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
    children,
    onEmployeeCreated
}) => {
    const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);

    const openEmployerModal = () => {
        setIsEmployerModalOpen(true);
    };

    const closeEmployerModal = () => {
        setIsEmployerModalOpen(false);
    };

    const refreshEmployees = () => {
        if (onEmployeeCreated) {
            onEmployeeCreated();
        }
    };

    return (
        <ModalContext.Provider
            value={{
                isEmployerModalOpen,
                openEmployerModal,
                closeEmployerModal,
                refreshEmployees
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};