interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition duration-200";
  
  const variantStyles = {
    primary: "bg-brand-DEFAULT text-white hover:bg-brand-dark",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border-2 border-brand-DEFAULT text-brand-DEFAULT hover:bg-red-50",
  };

  const styles = `${baseStyles} ${variantStyles[variant]}`;

  return (
    <button type="button" onClick={onClick} className={styles}>
      {label}
    </button>
  );
}

