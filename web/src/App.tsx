import { RouterProvider } from 'react-router'
import { router } from './routes'
// import { Copy, DownloadSimple, Link, Trash, Warning } from 'phosphor-react'

function App() {
  return (
    <RouterProvider router={router} />
    // <div>
    //   <Copy size={32} />
    //   <Trash size={32} />
    //   <Warning size={32} />
    //   <DownloadSimple size={32} />
    //   <Link size={32} />

    //   <h1>Brev.ly Frontend</h1>
    // </div>
  )
}

export default App
