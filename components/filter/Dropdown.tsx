"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const DropDown: React.FC<IDropDownProps> = ({ children, title }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    };
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
<div className="relative group" ref={dropdownRef}>
  <div
    className={`flex w-full h-11 px-[18px] py-2.5 gap-2 cursor-pointer transition duration-200 ${isMenuOpen ? "text-purpletext rounded-md" : "text-blackish"}`}
    onClick={toggleMenu}
  >
    <span className="font-light text-[16px] group-hover:text-purpletext">{title}</span>
    <span className="group-hover:text-purpletext">
      {isMenuOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
  </div>
  {isMenuOpen && <>{children}</>}
</div>

    );
};

export default DropDown;
