import React from 'react';
import './App.scss';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { BackToTopButton } from './components/BackToTop/BackToTop';
import { Route, Routes } from 'react-router-dom';
import { NewsPage } from './pages/NewsPage/NewsPage';
import { NewsCardPage } from './pages/NewsPageCard/NewsPageCard';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { HomePage } from './pages/HomePage/HomePage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { CafeCardPage } from './pages/CafeCardPage/CafeCardPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <div className="App">
      <Header />
        <main className="main">
          <Routes>
            <Route path="/cafe-guide/">
              <Route index element={<HomePage />} />
              <Route path="catalog" element={(<CatalogPage />)} />
              <Route path="cafes/:id" element={(<CafeCardPage />)} />
              <Route path="news" element={(<NewsPage />)} />
              <Route path="news/:title" element={(<NewsCardPage />)} />
              <Route path="account" element={(<AccountPage />)} />
              <Route path="register" element={(<RegisterPage />)} />
            </Route>
          </Routes>
          <BackToTopButton />
        </main>
      <Footer />
    </div>
  );
}

export default App;
