import React, { useState, useEffect, useContext } from 'react';
import './News.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';

const News = () => {
  const { coinId } = useParams();
  const { curr } = useContext(CoinContext);
  const [coindata, setCoinData] = useState(null);
  const [newsdata, setNewsData] = useState([]);

  const fetchNewsData = async (symbol) => {
    const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;

    if (!symbol) return; // Ensure symbol is available before fetching news

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:${symbol}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setNewsData(data.feed || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const getCoinData = async () => {
    const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCoinData(data);
      
      // Fetch news only after coin data is available
      fetchNewsData(data.symbol);
    } catch (err) {
      console.error("Error fetching coin data:", err);
    }
  };

  useEffect(() => {
    getCoinData();
  }, [coinId]);

  return (
    <div className='news-card'>
      <h2>Crypto News</h2>
      <p>Latest updates on <span className='coin-id'>{coinId.toUpperCase()}</span></p>
      {newsdata.length > 0 ? (
        newsdata.slice(0, 3).map((feed, index) => (
          <div key={index} className="news-card-1">
            <h3>{feed.title}</h3>
            <p><strong>Source:</strong> {feed.author || 'Unknown'}</p>
            <p>{feed.summary}</p>
            <a href={feed.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default News;
