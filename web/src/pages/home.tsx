import LogoBrevLy from '../assets/logo.svg'
import { NewLink } from '../components/newLink'
import { HistoryLinks } from '../components/historyLinks'

export function Home() {
  return (
    <main className="flex flex-col w-full max-w-[995px] mx-auto p-5 md:items-start md:mt-[4vh] items-center">
      <img src={LogoBrevLy} alt="Brev.ly Logo" className="w-32 h-32" />
      <div className='flex flex-col w-full gap-6 md:flex-row md:items-start'>
        <NewLink />
        <HistoryLinks />
      </div>
    </main>
  )
}
