import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

import './App.css';
import City from './components/City';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// import AppLayout from './pages/AppLayout'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import PageNotFound from './pages/PageNotFound'
// import Pricing from './pages/Pricing'
// import Product from './pages/Product'

// lazy loading the pages to split the bundle (huge JavaScript file with all together)
// Before lazy loading sizes: dist/assets/index-de97261f.css   27.54 kB │ gzip:   4.45 kB
//                            dist/assets/index-bbedd01a.js   365.31 kB │ gzip: 101.64 kB
// After lazy loading sizes: 
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
         {/* we can use Suspense, so we can show a loading spinner for the lazy loaded components or pages */}
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
