import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const LayoutOne = () => {


  const curentUser = useSelector((state)=>state.userId?.value)

  const navigate = useNavigate()

 useEffect(()=>{
  if(curentUser === null){
    navigate('/login')
  }
 },[])

  return (
    <>
    
    
    <Navbar />
    <Outlet />
    
    
    
    </>
  )
}

export default LayoutOne