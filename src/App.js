import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cadastro from "./pages/Cadastro/Cadastro";
import Create from "./pages/Create/Create";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
