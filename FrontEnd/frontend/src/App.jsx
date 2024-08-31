import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Productos from './components/Producto/Producto';
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/producto" element={<Productos/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
