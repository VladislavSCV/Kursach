import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import '../assets/Header.css';
import Logo from './Logo';
import userPhoto from '../assets/photo/man.jpg';
import { MenuIcon, HeartIcon, BoxIcon, CartIcon } from './Icons';
import AuthModal from './AuthModal';

const Header = ({ searchQuery, setSearchQuery, searchHistory = [], onSearch }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Загружаем данные пользователя и корзины при монтировании
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    const savedCart = localStorage.getItem('cart');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    }

    if (token) {
      fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(userData => {
          if (userData.id) {
            setUser(userData);
            localStorage.setItem('currentUser', JSON.stringify(userData));
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('currentUser');
            setUser(null);
          }
        })
        .catch(console.error);
    }
  }, []);

  // Обновление корзины (локальная функция)
  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleSuggestionClick = suggestion => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleLogin = userData => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleRegister = userData => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <Link to="/" className='all-articles'>
          <div className="logo-container">
            <Logo />
            <span>СЕВЕРЯНОЧКА</span>
          </div>
        </Link>

        <button className="catalog-button" onClick={() => navigate('/catalog')}>
          <MenuIcon />
          <span>Каталог</span>
        </button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Найти товар"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button
            onClick={handleSearchClick}
            className="search-btn"
          >
            <span role="img" aria-label="search"></span>
          </button>

          {showSuggestions && searchHistory.length > 0 && (
            <div className="search-suggestions">
              {searchHistory
                .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onMouseDown={() => handleSuggestionClick(item)} // вместо onClick
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>

        <nav className="nav-links">
          <Link to="/favorites" className="nav-link">
            <HeartIcon />
            <span>Избранное</span>
          </Link>
          <Link to="/orders" className="nav-link">
            <BoxIcon />
            <span>Заказы</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <CartIcon />
            <span>Корзина</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>

        <div className="user-menu">
          {user ? (
            <div className="user-profile">
              <img src={user.photo || userPhoto} alt="User" />
              <span>{user.name}</span>
              <svg
                className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}
                viewBox="0 0 16 16"
                fill="currentColor"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <path d="M7.999 11.5l-3.5-3.5 1.414-1.414L7.999 9.672l3.5-3.5 1.414 1.414L9.414 11.5H7.999z" />
              </svg>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => setIsAuthOpen(true)}>
              Войти
            </button>
          )}
        </div>
      </header>

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default Header;
