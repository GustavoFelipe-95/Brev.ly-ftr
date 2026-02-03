import { Link } from "phosphor-react";

export function ListEmpty() {
  return (
    <div className="flex flex-col w-full p-8 items-center justify-center border-t border-gray-200">
      <Link className="text-gray-400 mb-2" size={32} />
      <p className="text-xs text-gray-500">ainda não existem links cadastrados</p>
    </div>
  )
}