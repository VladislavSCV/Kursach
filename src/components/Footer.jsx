import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Footer.css';

const Footer = () => {
  const socialLinks = [
    { href: '#', alt: 'Instagram', src: require('../assets/photo/insta.png') },
    { href: '#', alt: 'VK', src: require('../assets/photo/vk.png') },
    { href: '#', alt: 'Facebook', src: require('../assets/photo/facebook.png') },
    { href: '#', alt: 'OK', src: require('../assets/photo/odnoklassniki.png') },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Логотип */}
        <div className="footer-logo-block">
          <img 
            src={require('../assets/photo/logofoot.png')} 
            alt="Логотип Северяночка" 
            className="footer-logo"
          />
        </div>

        {/* Ссылки */}
        <nav className="footer-nav">
          <Link to="/about" className="footer-link">О компании</Link>
          <Link to="/contacts" className="footer-link">Контакты</Link>
          <Link to="/vacancies" className="footer-link">Вакансии</Link>
          <Link to="/articles" className="footer-link">Статьи</Link>
          <a href="#" className="footer-link">Политика обработки персональных данных</a>
        </nav>

        {/* Социальные сети */}
        <div className="footer-social">
          {socialLinks.map((social, idx) => (
            <a key={idx} href={social.href} aria-label={social.alt} className="social-link">
              <img src={social.src} alt={social.alt} />
            </a>
          ))}
        </div>

        {/* Контактный телефон */}
        <div className="footer-contact">
          <img 
            src={require('../assets/photo/phone.png')} 
            alt="Телефон" 
            className="phone-icon"
          />
          <a href="tel:88007773333" className="phone-number">8 800 777 33 33</a>
        </div>

        {/* Дизайнер */}
        <div className="footer-credit">
          Дизайн: <span className="designer-name">SCVORTSOVKIY</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
