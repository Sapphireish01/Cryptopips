import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import Linechart from '../../Components/Linechart/Linechart';
import News from '../../Components/News/News';

const Coin = () => {
  const { coinId } = useParams();
  const [coindata, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { curr } = useContext(CoinContext);

  const fetchWithHandling = async (url) => {
    try {
      const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': API_KEY
        }
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error.message);
      return null;
    }
  };

  const getCoinData = async () => {
    const data = await fetchWithHandling(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    if (data) setCoinData(data);
  };

  const getHistoricalData = async () => {
    const data = await fetchWithHandling(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${curr.name}&days=10&interval=daily`
    );
    if (data) setHistoricalData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500)); 
      getCoinData();
      await new Promise((resolve) => setTimeout(resolve, 2500)); 
      getHistoricalData();
    };
    
    fetchData();
  }, [curr]);

  if (coindata && historicalData) {
    return (
      <div className='coin'>
        <h1>{coinId}</h1>
        <div className="coin-card">
          <img src={coindata.image?.large} alt="" />
          <p><b>{coindata.name} {coindata.symbol?.toUpperCase()}</b></p>
        </div>
        <div className="coin-chart">
          <Linechart historicalData={historicalData} />
          <News />
        </div>
      </div>
    );
  } else {
    return (
      <div className="coin">
        <div className='spinner'>
          <div className="spin"></div>
        </div>
      </div>
    );
  }
};

export default Coin;
