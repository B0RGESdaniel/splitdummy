import { AppRoutes } from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col h-svh">
      <AppRoutes />
      <ToastContainer />
    </div>
  )
}
