import { motion } from "framer-motion";

export function LoadingSpinner({
    size = 40,
    lineSize = 4,
    color = "#4A90E2",
    label,
    className = ""
}: {
    size?: number;
    lineSize?: number;
    color?: string;
    label?: string;
    className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `${lineSize}px solid #ddd`,
        borderTop: `${lineSize}px solid ${color}`,
      }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    {label && <p className="text-md text-gray-700">{label}</p>}
    </div>
  );
}
