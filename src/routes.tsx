import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { App } from './app'
import { People } from './pages/people'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/people" element={<People />} />
      </Routes>
    </BrowserRouter>
  )
}
