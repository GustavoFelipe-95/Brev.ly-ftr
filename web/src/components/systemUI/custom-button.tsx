import type { ButtonHTMLAttributes } from "react"

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "square" | "rectangular";
}

export function CustomButton({
  size,
  children,
  ...rest
}: CustomButtonProps) {
  return (
    <button
      className={`
        flex flex-row items-center justify-center gap-2 rounded-md
        bg-gray-200 text-gray-500 font-semibold text-sm transition-colors disabled:opacity-50
        ${size === "square" ? "w-10 h-10 flex items-center justify-center" : "py-2 px-4"}
      `}
      {...rest}>
      {children}
    </button>
  )
}