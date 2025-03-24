import React from 'react'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Coin from './Pages/Coin/Coin'
import Side from './Components/Sidepanel/Side'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className='container'>
        <Side/>
        <div className='card'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/coin/:coinId' element={<Coin/>}/>
          </Routes>
        </div>                
      </div>
      <Footer/>     
    </div>
  )
}

export default App
