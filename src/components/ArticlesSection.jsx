import React from 'react';
import { Link } from 'react-router-dom'; 
import ArticleCard from './ArticleCard';
import '../assets/ArticlesSection.css';

const ArticlesSection = () => {
  const articles = [
    {
      image: require('../assets/photo/article.png'),
      date: '05.03.2021',
      title: 'Режим использования масок и перчаток',
      description: 'Подробная информация о режимах использования масок и перчаток на территории магазинов "ЛЕНТА". Информация обновляется каждый день.',
    },
    {
      image: require('../assets/photo/article1.png'),
      date: '05.03.2021',
      title: 'Весеннее настроение для каждой',
      description: '8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.',
    },
    {
      image: require('../assets/photo/article2.png'),
      date: '22.02.2020',
      title: 'ЗОЖ или ФАСТФУД. А вы на чьей стороне?',
      description: 'Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!',
    },
  ];

  return (
    <section className="articles-section">
      <div className="section-header">
        <h2>Статьи</h2>
        <Link to="/articles" className="all-articles">Все статьи </Link>
      </div>

      <div className="articles-container">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            image={article.image}
            date={article.date}
            title={article.title}
            description={article.description}
            onReadMore={() => console.log('Читать:', article.title)}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;