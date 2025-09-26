import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

// Главная
import Hero from './components/Hero';
import Promotions from './components/Promotions';
import News from './components/News';
import BuyAgo from './components/BuyAgo';
import SpecialOffersSection from './components/SpecialOffersSection';
import OurStores from './components/OurStores';
import ArticlesSection from './components/ArticlesSection';

// Страницы
import FavoritesPage from './components/FavoritesPage';
import CatalogPage from './components/CatalogPage';
import CategoryPage from './components/CategoryPage';
import AboutPage from './components/AboutPage';
import VacanciesPage from './components/VacanciesPage';
import ContactsPage from './components/ContactsPage';
import CartPage from './components/CartPage';
import DeliveryPage from './components/DeliveryPage';
import OrdersPage from './components/OrdersPage';
import AllArticlesPage from './pages/AllArticlesPage';
import AllPromotionsPage from './pages/AllPromotionsPage';
import AllNewsPage from './pages/AllNewsPage';
import AllBuyAgoPage from './pages/AllBuyAgoPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [newsProducts, setNewsProducts] = useState([]); 
  const [buyAgoProducts, setBuyAgoProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/promotions')
      .then(res => res.json())
      .then(data => setPromotions(data))
      .catch(console.error);

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setNewsProducts(data.slice(0, 8));
        setBuyAgoProducts(data.slice(8, 16));
      })
      .catch(console.error);

    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(setArticles)
      .catch(console.error);
  }, []);

  const onSearch = (query) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setSearchHistory(prev => [query, ...prev.filter(item => item !== query)].slice(0, 5));
  };

  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === product.id)
        ? prev.filter(fav => fav.id !== product.id)
        : [...prev, product]
    );
  };

  const isFavorite = (product) => favorites.some(fav => fav.id === product.id);

  const HomePage = () => (
    <>
      <Hero />
      <Promotions
        promotions={promotions}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <News
        products={newsProducts}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <BuyAgo
        products={buyAgoProducts}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      <SpecialOffersSection />
      <OurStores />
      <ArticlesSection articles={articles} />
    </>
  );

  return (
    <Router>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchHistory={searchHistory}
        onSearch={onSearch}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/category/:categoryKey" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/articles" element={<AllArticlesPage articles={articles} />} />
        <Route path="/promotions" element={<AllPromotionsPage promotions={promotions} />} />
        <Route path="/news" element={<AllNewsPage products={newsProducts} />} />
        <Route path="/buyago" element={<AllBuyAgoPage products={buyAgoProducts} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
