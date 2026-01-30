import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar/navbar'
import Home from './component/home/home'
import Footer from './component/footer/footer'
import About from './component/about/about'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './component/signup/signup'
import Signin from './component/signup/signin'
import Todo from './component/todo/todo'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/todo' element={<Todo/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/todo' element={<Todo/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>

    </div>
  )
}

export default App
