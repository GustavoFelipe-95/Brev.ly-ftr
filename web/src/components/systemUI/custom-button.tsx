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
        bg-blue-base text-white font-semibold rounded-md transition-colors disabled:opacity-50 enabled:cursor-pointer enabled:hover:bg-blue-dark
        ${size === "square" ? "w-10 h-10 flex items-center justify-center" : "py-2 px-4"}
      `}
      {...rest}>
      {children}
    </button>
  )
}