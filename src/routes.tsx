import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/header'
import { People } from './pages/people'
import { Items } from './pages/items'
import { Divide } from './pages/divide'
// import { Receipt } from './pages/receipt'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<People />} />
        <Route path="/items" element={<Items />} />
        <Route path="/divide" element={<Divide />} />
        {/* <Route path="/receipt" element={<Receipt />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
