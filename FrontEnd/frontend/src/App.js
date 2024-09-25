import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import { Header } from "./components/Header";
import { Login } from "./components/login/Login";
import { Principal } from "./components/principal/Principal";

function App() {
  return (
    <BrowserRouter>
      <div className="App fondo ">
        <Header />

        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/principal" element={<Principal />} />

            <Route path='/*' element={<Principal />}></Route>
          </Routes>
        </main>

      </div>
    </BrowserRouter>
);
}

export default App;
