
import React, { createContext, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import useOrderHandler from "../hooks/useOrderHandler";
import { useSnackbar } from 'notistack';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidAsk, setBidAsk] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [buyTotal, setBuyTotal] = useState(0);
  const [amountBuy, setAmountBuy] = useState(0);
  const [amountSell, setAmountSell] = useState(0);
  const [orderOpenList, setOrderOpenList] = useState([]);
  const [priceBuy, setPriceBuy] = useState(currentPrice);
  const [selectTab, setSelectTab] = useState(0);
  const [priceSell, setPriceSell] = useState(currentPrice);
  const [sliderValueSell, setSliderValueSell] = useState(0);
  const [sellTotal, setSellTotal] = useState(0);
  const [pair, setPair] = useState("BTC-USD");
  const [candles, setCandle] = useState([]);
  const [resolution, setResolution] = useState({ resolution: "1m", iso: 50 });
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const [coinAmounts, setCoinAmounts] = useState({
    "BTC-USD": 0,
    "ETH-BTC": 0,
    "LTC-USD": 0,
    "XRP-USD": 0,
  });
 

  const socket = useWebSocket(pair, resolution, setBidAsk, setCandle, setCurrentPrice);

  const { buyHandlerBtn } = useOrderHandler({
    balance, setBalance, setSliderValue,
    orderOpenList, setOrderOpenList, setBuyTotal,
    currentPrice, pair, selectTab, setAmountBuy,
    amountBuy, priceBuy, buyTotal,
    amountSell, priceSell, sellTotal, setSliderValueSell,
    coinAmounts, setCoinAmounts, handleClickVariant, setSellTotal, setAmountSell,
  });

  const { enqueueSnackbar } = useSnackbar();

  function handleClickVariant (variant, msg) {
    enqueueSnackbar(msg, { variant });
  };

  return (
    <Context.Provider
      value={{
        bidAsk, setBidAsk, socket,
        sliderValue, setSliderValue,
        buyTotal, setBuyTotal,
        amountBuy, setAmountBuy,
        orderOpenList, setOrderOpenList,
        priceBuy, setPriceBuy,
        selectTab, setSelectTab,
        priceSell, setPriceSell,
        amountSell, setAmountSell,
        sliderValueSell, setSliderValueSell,
        sellTotal, setSellTotal,
        coinAmounts, setCoinAmounts,
        currentPrice, setCurrentPrice,
        balance, setBalance,
        pair, setPair,
        resolution, setResolution,
        candles, setCandle,
        darkMode, setDarkMode,
        buyHandlerBtn, handleClickVariant
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };