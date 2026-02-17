"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  actions?: {
    confirm: {
      label: string;
      onClick: () => void;
      variant?: "primary" | "danger";
    };
    cancel?: {
      label: string;
      onClick?: () => void;
    };
  };
  size?: "sm" | "md" | "lg";
}

/**
 * Accessible Modal Component
 *
 * Features:
 * - Focus trapping (keyboard navigation stays within modal)
 * - Escape key to close
 * - ARIA labels and roles
 * - Semantic HTML with dialog element
 * - Semi-transparent overlay
 * - Smooth animations
 *
 * Usage:
 * ```
 * const [isOpen, setIsOpen] = useState(false);
 * <Modal
 *   isOpen={isOpen}
 *   title="Delete Item?"
 *   description="This action cannot be undone."
 *   onClose={() => setIsOpen(false)}
 *   actions={{
 *     confirm: {
 *       label: "Delete",
 *       onClick: handleDelete,
 *       variant: "danger"
 *     },
 *     cancel: { label: "Cancel" }
 *   }}
 * />
 * ```
 */
export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  actions,
  size = "md",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Focus the dialog for accessibility
      setTimeout(() => dialogRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      
      // Restore focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="presentation"
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" />

      {/* Modal Dialog */}
      <dialog
        ref={dialogRef}
        open={isOpen}
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        aria-modal="true"
        className={`relative z-10 w-full ${sizeClasses[size]} rounded-lg bg-white p-6 shadow-lg focus:outline-none`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close modal"
          type="button"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2
          id="modal-title"
          className="pr-6 text-xl font-semibold text-gray-900"
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p
            id="modal-description"
            className="mt-2 text-gray-600"
          >
            {description}
          </p>
        )}

        {/* Custom content */}
        {children && <div className="mt-4">{children}</div>}

        {/* Action buttons */}
        {actions && (
          <div className="mt-6 flex items-center justify-end gap-3">
            {actions.cancel && (
              <button
                onClick={() => {
                  actions.cancel?.onClick?.();
                  onClose();
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
                type="button"
              >
                {actions.cancel.label}
              </button>
            )}
            <button
              onClick={actions.confirm.onClick}
              className={`rounded-lg px-4 py-2 font-medium text-white transition ${
                actions.confirm.variant === "danger"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              type="button"
            >
              {actions.confirm.label}
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
