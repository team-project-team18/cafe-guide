import React from 'react';
import './App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
        <main className="main">
        </main>
      <Footer />
    </div>
  );
}

export default App;
