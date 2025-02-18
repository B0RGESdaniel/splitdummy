import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/header'
import { People } from './pages/people'
import { Items } from './pages/items'
import { Divide } from './pages/divide'
import { Receipt } from './pages/receipt'

const deployUrl = '/splitdummy'
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`${deployUrl}/`} element={<People />} />
        <Route path={`${deployUrl}/items`} element={<Items />} />
        <Route path={`${deployUrl}/divide`} element={<Divide />} />
        <Route path={`${deployUrl}/receipt`} element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  )
}
