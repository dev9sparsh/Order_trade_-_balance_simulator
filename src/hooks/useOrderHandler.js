import { useCallback } from 'react';

const useOrderHandler = (orderParams) => {
  const {
    balance, setBalance, setSliderValue,
    orderOpenList, setOrderOpenList, setBuyTotal,
    currentPrice, pair, selectTab, setAmountBuy,
    amountBuy, priceBuy, buyTotal, setSellTotal, setAmountSell,
    amountSell, priceSell, sellTotal, setSliderValueSell,
    coinAmounts, setCoinAmounts, handleClickVariant
  } = orderParams

  const buyHandlerBtn = useCallback(
    (btnChecker) => {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
      const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      const fullDateTime = `${formattedDate} ${formattedTime}`;
      setOrderOpenList([
        ...orderOpenList,
        {
          id: `${Date.now()}_${btnChecker === "buy" ? 'bid' : 'ask'}_id`,
          date: fullDateTime,
          pair,
          side: btnChecker === "buy" ? "Buy" : "Sell",
          type: selectTab === 1 ? "Market" : "Limit",
          amount: btnChecker === "buy" ? amountBuy : amountSell,
          price: btnChecker === "buy"
            ? (selectTab === 1 ? currentPrice : priceBuy)
            : (selectTab === 1 ? currentPrice : priceSell),
          total: btnChecker === "buy" ? buyTotal : sellTotal,
          status: selectTab === 1 ? "Success" : "Pending",
          action: selectTab === 1 ? false : true,
        },
      ]);

      if (btnChecker === "buy") {
        if (selectTab === 0) {
          setBalance(balance - buyTotal);
          setSliderValue(0);
          setBuyTotal(0);
          setAmountBuy(0);
          handleClickVariant("success", `You Limit Order is created!`);
        } else {
          setBalance(balance - buyTotal);
          setSliderValue(0);
          setBuyTotal(0);
          setAmountBuy(0);
  
          setCoinAmounts({
            ...coinAmounts,
            [pair]: coinAmounts[pair] + amountBuy,
          });
          handleClickVariant("success", `Your market order is successful!`);
        }
      } else {
        if (selectTab === 0) {
          setSliderValueSell(0);
          setSellTotal(0);
          setAmountSell(0);
          setCoinAmounts({
            ...coinAmounts,
            [pair]: coinAmounts[pair] - amountSell,
          });
          handleClickVariant("success", `You Limit Order is created!`);
        } else {
          setBalance(balance + sellTotal);
          setSliderValueSell(0);
          setSellTotal(0);
          setAmountSell(0);
          setCoinAmounts({
            ...coinAmounts,
            [pair]: coinAmounts[pair] - amountSell,
          });
          handleClickVariant("success", `Your market order is successful!`);
        }
      }
    },
    // eslint-disable-next-line
    [
      orderOpenList, pair, selectTab,
      amountBuy, priceBuy, buyTotal,
      balance, coinAmounts, currentPrice,
      priceSell, amountSell, sellTotal, 
    ]
  );

  return { buyHandlerBtn };
};

export default useOrderHandler;
