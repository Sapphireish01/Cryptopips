import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
    const [allCoin, setAllCoin] = useState([]);
    const [curr, setCurr] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchCoinInfo = async () => {
        const API_KEY = import.meta.env.VITE_APP_COIN_GECKO_API_KEY;

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.name}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "x-cg-demo-api-key": API_KEY,
                    },
                }
            );
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }
    };

    useEffect(() => {
        fetchCoinInfo();
    }, [curr]);

    const contextValue = {
        allCoin,
        curr,
        setCurr,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
