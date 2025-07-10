import React from 'react'
// import { Button } from 'react-bootstrap'
import Register from '../Pages/Register'
import{Link} from 'react-router-dom'
import Navbar from './Navbar'
import Banner from './Banner'
import Footer from './Footer'
function Header() {
  return (
    <div>
    <Navbar/>
    <Banner/>
    <Footer/>
    </div>
  )
}

export default Header