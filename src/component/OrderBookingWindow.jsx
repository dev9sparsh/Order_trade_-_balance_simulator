import React, { useContext, useCallback } from "react";
import { Box, InputAdornment, Slider, Typography } from "@mui/material";
import {
  Btn,
  BuyButton,
  Card,
  FieldTitle,
  SearchTextField,
  TextFieldWrapper,
  Wrapper,
} from "../Style";
import { Context } from "../context/context";

const OrderBookingWindow = () => {
  const {
    pair,
    darkMode,
    balance,
    currentPrice,
    setSliderValue,
    buyTotal,
    setBuyTotal,
    amountBuy,
    setAmountBuy,
    priceBuy,
    setPriceBuy,
    selectTab,
    setSelectTab,
    priceSell,
    setPriceSell,
    amountSell,
    setAmountSell,
    sliderValueSell,
    setSliderValueSell,
    sellTotal,
    setSellTotal,
    coinAmounts,
    sliderValue,
    buyHandlerBtn,
  } = useContext(Context);

  const handleChangeSlider = useCallback(
    (percentage, type) => {
      if (type === "buy") {
        setSliderValue(percentage);
        setBuyTotal(balance * (percentage / 100));
        setAmountBuy((percentage * balance) / 100 / priceBuy);
      } else if (type === "sell") {
        setSliderValueSell(percentage);
        setSellTotal((priceSell * percentage * coinAmounts[pair]) / 100);
        setAmountSell(coinAmounts[pair] * (percentage / 100));
      }
    },
    [
      balance,
      priceBuy,
      priceSell,
      coinAmounts,
      pair,
      setAmountBuy,
      setAmountSell,
      setBuyTotal,
      setSellTotal,
      setSliderValue,
      setSliderValueSell,
    ]
  );

  const handleSliderChange = useCallback(
    (type) => (_, percentage) => {
      handleChangeSlider(percentage, type);
    },
    [handleChangeSlider]
  );

  const handleChange = (setter, type) => (e) => {
    const value = e.target.value;
    setter(value);
    if (type === "buy") {
      setSliderValue(((value * priceBuy) / balance) * 100);
      setBuyTotal(value * priceBuy);
    } else if (type === "sell") {
      setSliderValueSell((value / coinAmounts[pair]) * 100);
      setSellTotal(value * priceSell);
    }
  };

  const handleChangeBuyTotal = (event) => {
    const value = event.target.value;
    setBuyTotal(value);
    setSliderValue((parseFloat(value) / parseFloat(balance)) * 100);
    setAmountBuy(value / priceBuy);
  };

  const handleChangeSellTotal = (event) => {
    const value = event.target.value;
    setSellTotal(value);
    setSliderValueSell((parseFloat(value) / parseFloat(balance)) * 100);
    setAmountSell(value / priceBuy);
  };

  const tabButtonStyles = (tabIndex) => ({
    background: darkMode
      ? `${selectTab === tabIndex ? "#ccc" : ""}`
      : `${selectTab === tabIndex ? "#e1dcdc" : ""}`,
    color: darkMode
      ? `${selectTab === tabIndex ? "#000" : "#fff"}`
      : `${selectTab === tabIndex ? "" : "#000"}`,
  });

  const renderTextField = (
    value,
    onChange,
    startAdornment,
    endAdornment,
    disabled = false
  ) => (
    <SearchTextField
      Mode={darkMode}
      size="small"
      fullWidth
      required
      value={value}
      onChange={onChange}
      id="outlined-required"
      disabled={disabled}
      inputProps={{
        style: {
          color: !darkMode ? "#000" : "#fff",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FieldTitle Mode={darkMode}>{startAdornment}</FieldTitle>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <FieldTitle Mode={darkMode}>{endAdornment}</FieldTitle>
          </InputAdornment>
        ),
        sx: { fontSize: "14px" },
      }}
    />
  );

  return (
    <Card Mode={darkMode}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Btn onClick={() => setSelectTab(0)} sx={tabButtonStyles(0)}>
          Limit
        </Btn>
        <Btn
          onClick={() => {
            setSelectTab(1);
            setPriceBuy(currentPrice);
            setPriceSell(currentPrice);
          }}
          sx={tabButtonStyles(1)}
        >
          Market
        </Btn>
      </Box>
      <Typography
        gutterBottom
        sx={{
          color: darkMode ? "#fff" : "#000",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
        }}
      >
        Avbl {balance} {pair?.split("-")?.[1]}
        <Typography sx={{ fontSize: "12px" }}>
          Avbl {coinAmounts[pair]} {pair?.split("-")?.[0]}
        </Typography>
      </Typography>
      <Wrapper>
        <TextFieldWrapper>
          {renderTextField(
            selectTab === 0 ? priceBuy : "Market",
            handleChange(setPriceBuy),
            "Price",
            pair?.split("-")?.[1],
            selectTab === 1
          )}
          {selectTab === 0 &&
            renderTextField(
              amountBuy,
              handleChange(setAmountBuy, "buy"),
              "Amount",
              pair?.split("-")?.[0]
            )}
          <Slider
            sx={{ color: darkMode ? "blue" : "#000" }}
            aria-label="Small steps"
            value={balance < buyTotal ? 100 : sliderValue}
            onChange={handleSliderChange("buy")}
            step={20}
            min={0}
          />
          {renderTextField(
            buyTotal,
            handleChangeBuyTotal,
            "Total",
            pair?.split("-")?.[1]
          )}
          <BuyButton
            onClick={() => buyHandlerBtn("buy")}
            colorGreen={'green'}
            disabled={buyTotal > balance || priceBuy < 1 || buyTotal < 1}
          >
            Buy
          </BuyButton>
        </TextFieldWrapper>
        <TextFieldWrapper>
          {renderTextField(
            selectTab === 0 ? priceSell : "Market",
            handleChange(setPriceSell),
            "Price",
            pair?.split("-")?.[1],
            selectTab === 1
          )}
          {selectTab === 0 &&
            renderTextField(
              amountSell,
              handleChange(setAmountSell, "sell"),
              "Amount",
              pair?.split("-")?.[0]
            )}
          <Slider
            sx={{ color: darkMode ? "blue" : "#000" }}
            aria-label="Small steps"
            value={coinAmounts[pair] < amountSell ? 100 : sliderValueSell}
            onChange={handleSliderChange("sell")}
            step={20}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            disabled={priceBuy < 1}
            marks={true}
          />
          {renderTextField(
            sellTotal,
            handleChangeSellTotal,
            "Total",
            pair?.split("-")?.[1]
          )}
          <BuyButton
            onClick={() => buyHandlerBtn("sell")}
            disabled={
              coinAmounts[pair] < amountSell || priceSell < 1 || sellTotal < 1
            }
          >
            Sell
          </BuyButton>
        </TextFieldWrapper>
      </Wrapper>
    </Card>
  );
};

export default OrderBookingWindow;
