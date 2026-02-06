import { DownloadSimple } from "phosphor-react";
import { CustomButton } from "../systemUI/custom-button";
import { ListEmpty } from './list-empty';
import { CardItemHistory } from './card-item';
import { useEffect } from "react";
import { findAllShortened } from "../../http/shorten-api";
import { useDataStoreLink } from "../../dataStore/data-store-link";

export function HistoryLinks() {
  const { links, setStoreLinks, updateAccessLink } = useDataStoreLink();

  async function fetchHistoryLinks() {
    try {
      const [list] = await Promise.all([findAllShortened()]);
      setStoreLinks(list.links);
    } catch (error) {
      console.error("Failed to fetch history links:", error);
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

  return (
    <section className="flex flex-col w-full md:max-w-[593px] gap-4 bg-white rounded-lg p-4">
      <div className="flex flex-row justify-between items-center m-2">
        <p className='text-lg'>Meus Link</p>
        <CustomButton
          size="rectangular"
          disabled={links.length === 0}>
          <DownloadSimple size={16} />
          <p>Baixar CSV</p>
        </CustomButton>
      </div>

      <div className="overflow-y-auto max-h-[350vh] md:max-h-[650vh]">
        {
          links.length > 0 ? (
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