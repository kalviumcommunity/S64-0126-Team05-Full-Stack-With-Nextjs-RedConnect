import { FieldError, UseFormRegisterReturn } from "react-hook-form";

/**
 * Props for the FormInput reusable component
 */
interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

/**
 * FormInput Component - Reusable input field with label and error display
 *
 * Features:
 * - Integrates with React Hook Form's register
 * - Displays validation errors from Zod schema
 * - Accessible with proper label association
 * - Visual feedback for disabled state
 * - Support for various input types (text, email, password, etc.)
 *
 * @param props - FormInputProps
 * @returns JSX.Element
 */
export default function FormInput({
  label,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
  required = false,
  autoComplete,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        {...register}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors
          ${error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}
          ${disabled ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <p
          id={`${label}-error`}
          className="text-red-600 text-sm mt-1 font-medium"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
