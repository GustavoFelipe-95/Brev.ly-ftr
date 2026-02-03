import { Link, useParams } from 'react-router';
import LogoBrevLy from '../assets/Logo_Icon.svg';
import { useEffect } from 'react';

export function RedirectingPage() {

  const { shortenedLink } = useParams();
  const teste = useParams();

  function redirectToOriginalUrl(shortenedLink: string | undefined) {
    // Simulação de redirecionamento após buscar a URL original
    // const urlMapping: Record<string, string> = {
    //   'exemplo': 'https://www.exemplo.com',
    //   'teste': 'https://www.teste.com',
    // };
    // const originalUrl = shortenedLink ? urlMapping[shortenedLink] : null;
    // if (originalUrl) {
    //   window.location.href = originalUrl;
    // }

    console.log('Redirecionando para o link original associado a:', shortenedLink);
  }

  useEffect(() => {
    redirectToOriginalUrl(shortenedLink);
  }, [shortenedLink]);

  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='flex flex-col gap-6 justify-center items-center bg-white rounded-lg px-12 py-14 max-w-[580px] m-5'>
        <img src={LogoBrevLy} alt="logo da Brev.ly" className='w-[48px]' />
        <p className='text-xl'>Redirecionando...</p>
        <p className='text-md text-center text-gray-600 font-semibold'>
          O link será aberto automaticamente em alguns instantes.<br />
          Não foi redirecionado? <Link className='text-blue-base' to="/">Acesse aqui</Link>.
        </p>
      </div>
    </main>
  )
}