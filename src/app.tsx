import { useNavigate } from 'react-router-dom'
import logo from './assets/logo_splitdummy.svg'
import { Items } from './components/items'

export function App() {
  const navigate = useNavigate()
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col h-svh">
      <div className="w-full flex items-center justify-center">
        <img className="w-28" src={logo} alt="logo" />
      </div>
      {/* <div className="w-full flex-1 flex items-center justify-center">
        <button
          type="button"
          className="bg-blueish py-3 px-4 rounded-md text-snow text-xl font-semibold hover:bg-blueish/90"
          onClick={() => navigate('/people')}
        >
          Nova conta
        </button>
      </div> */}
      <Items />
    </div>
  )
}
