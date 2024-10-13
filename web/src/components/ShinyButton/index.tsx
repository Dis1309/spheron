import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { forwardRef } from "react"; // Added forwardRef

type ShinyButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const ShinyButton = forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className }, ref) => {
    return (
      <button ref={ref} className={cn("shiny-button group", className)}>
        <div className="spinner-container">
          <div className="spinner opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="front-layer"></div>
        <div className="text">{children}</div>
      </button>
    );
  }
);

export default ShinyButton;
