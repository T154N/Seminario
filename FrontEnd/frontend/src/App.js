import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import { Header } from "./components/Header";
import { Login } from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path='/*' element={<Login />}></Route> // Esta ruta por default es solo pq no hay otras
          </Routes>
        </main>

      </div>
    </BrowserRouter>
);
}

export default App;
