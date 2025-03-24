import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
