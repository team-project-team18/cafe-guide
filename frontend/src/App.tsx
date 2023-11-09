import React from 'react';
import './App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { BackToTopButton } from './components/BackToTop/BackToTop';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { CafeCardPage } from './pages/CafeCardPage/CafeCardPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { NewsPage } from './pages/NewsPage/NewsPage';

function App() {
  return (
    <div className="App">
      <Header />
        <main className="main">
          <Routes>
            <Route path="/cafe-guide/">
              <Route index element={<HomePage />} />
              <Route path="catalog" element={(<CatalogPage />)} />
              <Route path="cafes/:cafeId" element={(<CafeCardPage />)} />
              <Route path="news" element={(<NewsPage />)} />
            </Route>
          </Routes>
          <BackToTopButton />
        </main>
      <Footer />
    </div>
  );
}

export default App;
