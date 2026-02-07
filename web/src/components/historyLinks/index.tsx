import { DownloadSimple } from "phosphor-react";
import { CustomButton } from "../systemUI/custom-button";
import { ListEmpty } from './list-empty';
import { CardItemHistory } from './card-item';
import { useEffect, useState } from "react";
import { findAllShortened, generatedCSVAllShortened } from "../../http/shorten-api";
import { useDataStoreLink } from "../../dataStore/data-store-link";
import toast from "react-hot-toast";
import { LoadingSpinner } from "../systemUI/loading/spinner";

export function HistoryLinks() {
  const [isLoading, setIsLoading] = useState({list: true, exporting: false});
  const { links, setStoreLinks } = useDataStoreLink();

  async function fetchHistoryLinks() {
    try {
      const [list] = await Promise.all([findAllShortened()]);
      setStoreLinks(list?.links || []);
    } catch (error) {
      toast.error('Erro ao carregar os links. Tente novamente.');
      setStoreLinks([]);
    } finally {
      setIsLoading((prev) => ({ ...prev, list: false }));
    }
  } 

  useEffect(() => {
    fetchHistoryLinks();
  }, [setStoreLinks]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchHistoryLinks();
      }
    };

    const handleFocus = () => {
      fetchHistoryLinks();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  async function handleExport() { 
    try {
      setIsLoading((prev) => ({ ...prev, exporting: true }));
      const { reportUrl } = await generatedCSVAllShortened();
      window.open(reportUrl, '_blank');
      toast.success('CSV exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar CSV. Tente novamente.');
    } finally {
      setIsLoading((prev) => ({ ...prev, exporting: false }));
    }
  }

  return (
    <section 
      className="flex flex-col w-full md:max-w-[593px] gap-4 bg-white rounded-lg p-4"
      aria-label="Histórico de links encurtados">
      <div className="flex flex-row justify-between items-center m-2">
        <p className='text-lg' id="history-title">Meus Link</p>
        <CustomButton
          size="rectangular"
          onClick={handleExport}
          disabled={isLoading.list || isLoading.exporting || links.length === 0}
          aria-label="Baixar relatório CSV dos links"
          title="Exportar links para arquivo CSV">
            {
            isLoading.exporting
              ? <LoadingSpinner size={18} lineSize={2} color="currentColor" className="text-gray-400" /> 
              : <DownloadSimple size={16} className="text-primary" />
            }
          <p>{isLoading.exporting ? "Gerando CSV..." : "Baixar CSV"}</p>
        </CustomButton>
      </div>

      <div 
        className="overflow-y-auto max-h-[350vh] md:max-h-[650vh]"
        role="region"
        aria-labelledby="history-title"
        aria-live="polite">
        {
          isLoading.list ? (
            <div className="flex flex-col w-full p-8 items-center justify-center border-t border-gray-200" role="status" aria-label="Carregando links">
              <LoadingSpinner size={40} color="currentColor" className="text-blue-base" label="Obtendo seus links..." />
            </div>
          ) : links.length > 0 ? (
            links.map((item, index) => (
              <CardItemHistory key={`${item.id}_${item.shortenedLink}_${index}`} link={item} />
            ))
          ) : links.length === 0 ? (
            <ListEmpty />
          ) : null
        }
      </div>
    </section>
  )
}
