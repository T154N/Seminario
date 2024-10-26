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
import { PedidoProvider } from './components/Pedido/PedidoContext'; // Importamos PedidoProvider
import { ResumenPedido } from "./components/Pedido/ResumenPedido";
import { OpcionesPago } from "./components/Pedido/OpcionesPago";
import { PedidoExitoso } from "./components/Pedido/PedidoExitoso";

function App() {
  return (
    <BrowserRouter>
      <PedidoProvider> {/* Agregamos PedidoProvider envolviendo a CarritoProvider */}
        <CarritoProvider>
          <div className="App fondo">
            <Header />
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/pago" element={<ResumenPedido />} />
                <Route path="/opciones-pago" element={<OpcionesPago />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/pedido-exitoso" element={<PedidoExitoso />} />
                <Route path="/info" element={<Info />} />
                <Route path='/productos/:categoria' element={<Producto />} />
                <Route path='/productos' element={<Producto />} />
                <Route path="/principal" element={<Principal />} />
                <Route path='/' element={<Principal />} />
                <Route path='*' element={<Principal />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CarritoProvider>
      </PedidoProvider>
    </BrowserRouter>
  );
}

export default App;
