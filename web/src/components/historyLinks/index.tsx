import { Link, Warning } from "phosphor-react";
import { CustomButton } from "../systemUI/custom-button";

export function HistoryLinks() {
  return (
    <section className="flex flex-col w-full md:max-w-[593px] gap-4 bg-white rounded-lg p-4">
      <div className="flex flex-row justify-between items-center m-2">
        <p className='text-lg'>Meus Link</p>
        <CustomButton
          size="rectangular"
          disabled>
          Baixar CSV
        </CustomButton>
      </div>

      <div className="flex flex-col w-full p-8 items-center justify-center border-t border-gray-200">
        <Link className="text-gray-400 mb-2" size={32} />
        <p className="text-xs text-gray-500">ainda não existem links cadastrados</p>
      </div>
    </section>
  )
}