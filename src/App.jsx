import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Login from './components/Login'
import Registation from './components/Registation'
import Home from './pages/Home'
import app from './firebase.condig'
import { ToastContainer } from 'react-toastify'


const App = () => {

const myRoute = createBrowserRouter(createRoutesFromElements(
  <Route >
    <Route path='/' element={<LayoutOne />} >
    <Route index element={<Home />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Registation />} />

  </Route>
))




  return (
    <>
    
           <ToastContainer /> 
    <RouterProvider router={myRoute} />
    
    </>
  )
}

export default App