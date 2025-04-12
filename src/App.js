import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Home />
      </main>
    </div>
  );
}

export default App;
