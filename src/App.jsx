import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './pages/AppLayout'
import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import Form from './components/Form'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />

            {/* nested routes between <Route></Route> */}
            <Route path="app" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
            }>
              {/* index route is the default child route if none of other routes matches */}
              {/* Navigate is like a redirect; it is mainly used in nested routes */}
              <Route index element={<Navigate replace to='cities' />} />

              <Route path='cities' element={<CityList />} />
              {/* dynamic route with URL parameter */}
              <Route path='cities/:id' element={<City />} />

              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>
            {/* 404 page for all not found url's/pages */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
