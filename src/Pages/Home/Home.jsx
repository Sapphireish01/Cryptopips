import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin, curr} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    const inputData = event.target.value;
    setInput(inputData);
    if(inputData === ""){
      setDisplayCoin(allCoin);
    }
  }
  const searchHandler = async (event) => {
    event.preventDefault();
    const result= await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(result);
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  },[allCoin])

  return (
    <div className='home'>
        <div className='hero'>
          <h1>Crypto <br /> just at your fingertips</h1>
          <form onSubmit={searchHandler}>
            <input  onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto' required/>

            <datalist id='coinlist'>
              {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
            </datalist>

            <button type='submit'>Search</button>
          </form>        
          {/* <div className='card-corousel'>
              <div className="box">
                <p>{Coin.image}</p>
                <h3>{Coin.name}</h3>                
              </div>
              <div className="chart-card">
              </div>
          </div> */}
          <div className="crypto-table">
            <div className="table-layout">
              <p>#</p>
              <p>Coins</p>
              <p>Current Price</p>
              <p style={{textAlign: 'center'}}>24H change</p>
              <p className='market-cap'>Market Cap</p>
            </div>
            {
              displayCoin.slice(0,10).map((item, index) => (
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                  <p>{item.market_cap_rank}</p>
                  <div className='item-card'>
                    <img src={item.image} alt="" />
                    <p>{item.name + " - " + item.symbol}</p>
                  </div>
                  <p> {curr.symbol} {item.current_price.toLocaleString()} </p>
                  <p style={{textAlign: 'center'}} className={item.price_change_percentage_24h>0? "green": "red"}> {Math.floor(item.price_change_percentage_24h*100)/100} </p>
                  <p className='market-cap'>{curr.symbol} {item.market_cap.toLocaleString()}</p>                  
                </Link>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Home;
