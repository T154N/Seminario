import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Header } from "./components/Header";
import { Login } from "./components/login/Login";
import { Principal } from "./components/principal/Principal";
import { Catalogo } from './components/catalogo/Catalogo';
import { Info } from './components/info/Info';
import { Footer } from './components/Footer';
import { Producto } from './components/producto/Producto';
import { CarritoProvider } from './components/carrito/CarritoContext';


import { ResetPassword } from "./components/login/ResetPassword";
// import { CargarProducto } from "./components/cargarProducto/CargarProducto";

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> {/* CarritoProvider envuelve todas las rutas */}
        <div className="App fondo">
          <Header />

          <main>
            <Routes>
              <Route path="/login" element={<Login />} /> 
              <Route path='/reset-password' element={<ResetPassword/>}/>
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/info" element={<Info />} />
              <Route path='/productos/:categoria' element={<Producto />}/>
              <Route path='/productos' element={<Producto />}/>
              <Route path="/principal" element={<Principal />} />
              <Route path='/' element={<Principal />} />
              <Route path='*' element={<Principal />} />



              {/* <Route path='/cargarProducto' element={<CargarProducto/>}/> */}

            </Routes>
          </main>

          <Footer />
        </div>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;
