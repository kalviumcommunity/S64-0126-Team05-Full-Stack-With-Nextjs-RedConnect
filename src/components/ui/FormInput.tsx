"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FormInput({
  label,
  type = "text",
  name,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = "",
}: FormInputProps) {
  const hasError = !!error;

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError}
        {...register}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${
            hasError
              ? "border-red-300 bg-red-50"
              : "border-gray-300"
          }
        `}
      />
      {hasError && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

