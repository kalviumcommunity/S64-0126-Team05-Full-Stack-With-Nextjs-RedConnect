"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string | number; label: string }[];
  register: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function FormSelect({
  label,
  name,
  options,
  register,
  error,
  required = false,
  disabled = false,
  placeholder = "Select an option",
  className = "",
}: FormSelectProps) {
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
      <select
        id={name}
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
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

