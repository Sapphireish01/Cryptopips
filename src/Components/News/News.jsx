import React, { useState, useEffect, useContext } from 'react';
import './news.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';

const News = () => {
  const { coinId } = useParams();
  const { curr } = useContext(CoinContext);
  const [newsdata, setNewsData] = useState([]);

  const fetchNewsData = async () => {
    const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;

    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${coinId}&apiKey=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setNewsData(data.articles || []); // Store articles array
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, [coinId]);

  return (
    <div className='news-card'>
      <h2>Crypto News</h2>
      <p>Latest updates on <span className='coin-id'> {coinId.toUpperCase()} </span> </p>
      {newsdata.length > 0 ? (
        newsdata.slice(0, 3).map((article, index) => (
          <div key={index} className="news-card-1">
            <h3>{article.title}</h3>
            <p><strong>Source:</strong> {article.source.name}</p>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default News;
