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
import { PedidoProvider } from './components/Pedido/PedidoContext'; 
import { ResumenPedido } from "./components/Pedido/ResumenPedido";
import { OpcionesPago } from "./components/Pedido/OpcionesPago";
import { PedidoDetalle } from "./components/Pedido/PedidoDetalle";
import {PedidosUsuario} from './components/Pedido/PedidosUsuario';

function App() {
  return (
    <BrowserRouter>
      <PedidoProvider> 
        <CarritoProvider>
          <div className="App fondo">
            <Header />
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/pago" element={<ResumenPedido />} />
                <Route path="/opciones-pago" element={<OpcionesPago />} />
                <Route path="/pedidos-usuario" element={<PedidosUsuario />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/pedido-Detalle" element={<PedidoDetalle />} />
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
