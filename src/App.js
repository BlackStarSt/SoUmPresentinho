import React from "react";
import Header from "./components/Header/Header";
import App from '.'

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Bem-vindo ao meu site!</h2>
        <p>Este é um site feito com React.</p>
      </main>
    </div>
  );
}

export default App;
