import React, { useContext } from 'react';
import logo from '../../assets/Cryptopips-logo.png';
import arrow from '../../assets/right-arrow.png';
import '../Navbar/Navbar.css';
import { CoinContext } from '../../context/CoinContext'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { setCurr } = useContext(CoinContext);

  const currHandler = (event) => {
    const data = event.target.value;
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      eur: { name: "eur", symbol: "€" },
      ngn: { name: "ngn", symbol: "₦" }, 
    };
    setCurr(currencyMap[data] || currencyMap.usd);
  };

  return (
    <div className="navbar">
      <Link to={'/'}>
        <h1><img src={logo} alt="Cryptopips Logo" className='logo'/> Cryptopips</h1>
      </Link>      
      <div className='nav-right'>
        <select onChange={currHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="ngn">NGN</option>
        </select> 
        <button>Sign Up <img src={arrow} alt="Arrow Icon" /></button> 
      </div>  
    </div>
  );
};

export default Navbar;
