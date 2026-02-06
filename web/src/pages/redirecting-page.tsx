import { Link, useLoaderData } from 'react-router';
import LogoBrevLy from '../assets/Logo_Icon.svg';
import { useEffect } from 'react';
import type { IShortLinkOutput } from '../types/link';
import { useDataStoreLink } from '../dataStore/data-store-link';

export function RedirectingPage() {
  const { originalLink, shortenedLink, accessCount } = useLoaderData() as IShortLinkOutput;
  const {updateAccessLink} = useDataStoreLink();

  useEffect(() => {
    if (originalLink) {
      updateAccessLink(shortenedLink, accessCount);
      window.location.href = originalLink;
    }
  }, [originalLink]);

  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='flex flex-col gap-6 justify-center items-center bg-white rounded-lg px-12 py-14 max-w-[580px] m-5'>
        <img src={LogoBrevLy} alt="logo da Brev.ly" className='w-[48px]' />
        <p className='text-xl'>Redirecionando...</p>
        <p className='text-md text-center text-gray-600 font-semibold'>
          O link será aberto automaticamente em alguns instantes.<br />
          Não foi redirecionado? <Link className='text-blue-base' to={`${originalLink ?? '/'}`}>Acesse aqui</Link>.
        </p>
      </div>
    </main>
  )
}