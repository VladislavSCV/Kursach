import React from 'react';
import { Link } from 'react-router-dom'; 
import ArticleCard from './ArticleCard';
import '../assets/ArticlesSection.css';

const ArticlesSection = () => {
  const articles = [
    {
      image: require('../assets/photo/ovosh.png'),
      date: '12.09.2023',
      title: 'Как выбрать свежие продукты',
      description: 'Простые советы, чтобы не ошибиться с выбором фруктов, овощей и мяса.',
    },
    {
      image: require('../assets/photo/piknik.png'),
      date: '05.09.2023',
      title: 'Пикник на природе',
      description: 'Лучшие идеи для простого и вкусного пикника с друзьями.',
    },
    {
      image: require('../assets/photo/coffe.png'),
      date: '25.08.2023',
      title: 'Кофейные привычки',
      description: 'Почему чашка кофе по утрам — это больше, чем просто напиток.',
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