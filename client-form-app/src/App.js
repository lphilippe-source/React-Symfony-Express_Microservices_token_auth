// import logo from './logo.svg';
import './App.css';
import {FormLogin} from './FormLogin'
import { useState } from 'react'
import {tokenContext} from './context'
function App() {
  const [token,setToken]=useState(tokenContext)

  return( 
  <tokenContext.Provider value ={{token,setToken}}>
    <div className="container"><FormLogin/></div>
  </tokenContext.Provider>
  )
}

export default App;
