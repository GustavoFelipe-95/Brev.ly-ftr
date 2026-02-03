import { DownloadSimple } from "phosphor-react";
import { CustomButton } from "../systemUI/custom-button";
import { ListEmpty } from './list-empty';
import { CardItemHistory } from './card-item';

export function HistoryLinks() {
  const listHistoryLinks: any[] = [{
    id: 1,
    originalLink: "http://www.youtube.com/shorts/JGUib1OPXZc",
    shortLink: "abcd1234",
    visitCount: 42,
  }];

  return (
    <section className="flex flex-col w-full md:max-w-[593px] gap-4 bg-white rounded-lg p-4">
      <div className="flex flex-row justify-between items-center m-2">
        <p className='text-lg'>Meus Link</p>
        <CustomButton
          size="rectangular"
          disabled={listHistoryLinks.length === 0}>
          <DownloadSimple size={16} />
          <p>Baixar CSV</p>
        </CustomButton>
      </div>

      <div className="overflow-y-auto max-h-[350vh] md:max-h-[650vh]">
        {
          listHistoryLinks.length > 0 ? (
            listHistoryLinks.map((item, index) => (
              <CardItemHistory key={`${item.id}_${item.shortLink}_${index}`} link={item} />
            ))
          ) : listHistoryLinks.length === 0 ? (
            <ListEmpty />
          ) : null
        }
      </div>
    </section>
  )
}