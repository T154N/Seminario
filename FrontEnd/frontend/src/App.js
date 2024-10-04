import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import { Header } from "./components/Header";
import { Login } from "./components/login/Login";
import { Principal } from "./components/principal/Principal";
import { Catalogo } from './components/catalogo/Catalogo';
import { Info } from './components/info/Info';
import { Footer } from './components/Footer';
import { Producto } from './components/producto/Producto'

function App() {
  return (
    <BrowserRouter>
      <div className="App fondo">
        <Header />

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/info" element={<Info />} />
            <Route path='/productos/:categoria' element={<Producto />}/>

            <Route path='/productos' element={<Producto />}/>
            
            <Route path="/principal" element={<Principal />} />
            <Route path='/' element={<Principal />}></Route>
            <Route path='*' element={<Principal />}></Route>
          </Routes>
        </main>
        <Footer />

      </div>
    </BrowserRouter>
);
}

export default App;
