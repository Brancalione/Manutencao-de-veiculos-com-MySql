
import Buscar from "./components/Buscar";
import FormCriar from './components/FormCriar.jsx'
import React from "react";
import Login from './components/Login.jsx';
import Register from './components/Register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
    return (
      <main>
      <BrowserRouter>
          <Routes>
          <Route path="/listar" element={<Buscar />} />
          <Route path="/formcriar" element={<FormCriar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Routes>
      </BrowserRouter>
  </main>
);
}
    
export default App;