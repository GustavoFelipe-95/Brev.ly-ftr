import { Link } from 'react-router';
import errorLink from '../assets/404.svg';

export function NotFoundPage() {
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='flex flex-col gap-6 justify-center items-center bg-white rounded-lg px-12 py-14 max-w-[580px] m-5'>
        <img src={errorLink} alt="404 Not Found" className='w-50' />
        <p className='text-xl'>Link não encontrado</p>
        <p className='text-md text-center text-gray-600 font-semibold'>
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em <Link className='text-blue-base' to="/">brev.ly</Link>.
        </p>
      </div>
    </main>
  )
}