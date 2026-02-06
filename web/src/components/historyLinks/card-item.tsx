import type { ILink } from "../../types/link";
import { Link } from "react-router";
import { CustomButton } from "../systemUI/custom-button";
import { Copy, Trash } from "phosphor-react";
import { toast, Toaster } from "react-hot-toast";
import { removeShortenedLink } from "../../http/shorten-api";
import { useDataStoreLink } from "../../dataStore/data-store-link";

type CardItemHistoryProps = {
  link: ILink;
}

export function CardItemHistory({
  link,
}: CardItemHistoryProps) {
  const { originalLink, shortenedLink, accessCount } = link;
  const host = `${import.meta.env.VITE_FRONTEND_URL}/${shortenedLink}`;
  const { removeStoreLink } = useDataStoreLink();

  async function handleClipboard() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(host);
        toast.success('Link copiado!');
      } else {
        fallbackCopyToClipboard(host);
      }
    } catch (error) {
      fallbackCopyToClipboard(host);
    }
  }

  function fallbackCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Link copiado!');
    } catch (error) {
      toast.error('Erro ao copiar link');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  async function handleDelete(shortenedLink: string) {
    const responseDelete = await removeShortenedLink(shortenedLink);
    if (responseDelete) {
      removeStoreLink(shortenedLink);
      toast.success('Link deletado!');
    } else {
      toast.error('Erro ao deletar link');
    }
  }

  return (
    <div className="flex flex-row justify-between items-center py-4 gap-3 border-t border-gray-200">
      <div className="flex flex-col gap-1 items-start">
        <Link
          className='text-md font-semibold text-blue-base'
          to={shortenedLink}
          target="_blank">
          {host}
        </Link>
        <p className="text-sm text-gray-500 break-all line-clamp-1">{originalLink}</p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <p className="text-xs text-gray-500 whitespace-nowrap">{accessCount} acesso{accessCount >= 2 ? 's' : ''}</p>
        <div className="flex flex-row gap-1">
        <CustomButton size="square" type="button" onClick={() => handleClipboard()}>
          <Copy size={16} className="text-gray-600" />
        </CustomButton>
        <CustomButton size="square" type="button" onClick={() => handleDelete(link.shortenedLink)}>
          <Trash size={16} className="text-gray-600" />
        </CustomButton>
        <Toaster position="bottom-center" />
        </div>
      </div>
    </div>
  )
}