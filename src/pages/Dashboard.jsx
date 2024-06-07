import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  Container,
  LeftWrapper,
  RightWrapper,
  TitleFirst,
  TitleMid,
  Titlethird,
} from "../Style";
import { useEffect, useContext } from "react";
import Chart from "../component/chart/Chart";
import OrderBook from "../component/common/OrderBook";
import { pairArray } from "../utils/data";
import HistoryTable from "../component/HistoryTable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Context } from "../context/context";
import OrderBookingWindow from "../component/OrderBookingWindow";



const Dashboard = () => {
  const {
    pair,
    setPair,
    bidAsk,
    darkMode,
    orderOpenList,
    setOrderOpenList,
    coinAmounts,
    setCoinAmounts,
    balance,
    setBalance,
    currentPrice,
    handleClickVariant,
  } = useContext(Context);

  const handleChange = (event) => {
    setPair(event.target.value);
  };

  useEffect(() => {
    const updatedList = orderOpenList?.map((item) => {
      if (
        item.price >= currentPrice &&
        item.side === "Buy" &&
        item.type === "Limit" &&
        item.status === "Pending" &&
        item.pair === pair
      ) {
        setCoinAmounts({
          ...coinAmounts,
          [pair]: coinAmounts[pair] + item?.total / currentPrice,
        });
        handleClickVariant(
          "success",
          `Limit order for ${item?.pair} for ${item?.total} ${
            item?.pair.split("-")?.[1]
          } successful!`
        );
        return {
          ...item,
          price: currentPrice,
          amount: item?.total / currentPrice,
          status: "Success",
          action: false,
        };
      } else if (
        item.price <= currentPrice &&
        item.side === "Sell" &&
        item.type === "Limit" &&
        item.status === "Pending" &&
        item.pair === pair
      ) {
        setBalance(balance + currentPrice * item?.amount);
        handleClickVariant(
          "success",
          `Limit order for ${item?.pair} for ${item?.total} ${
            item?.pair.split("-")?.[1]
          } successful!`
        );
        return {
          ...item,
          price: currentPrice,
          total: currentPrice * item?.amount,
          status: "Success",
          action: false,
        };
      } else {
        return item;
      }
    });
    setOrderOpenList(updatedList);
    // eslint-disable-next-line
  }, [currentPrice]);

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: darkMode ? "#2c2c2c" : "#fff",
        "& .MuiMenuItem-root": {
          bgcolor: "inherit",
          "&.Mui-selected": {
            background: darkMode ? "#4c4a4a" : "#dfdbdb",
            color: darkMode ? "#fff" : "#000",
            "&:hover": {
              background: darkMode ? "#3c3a3a" : "#efeeee",
            },
          },
          "&:hover": {
            background: darkMode ? "#3c3a3a" : "#efeeee",
          },
        },
      },
    },
  };


  return (
    <>
      <Container>
        <LeftWrapper>
          <Box
            sx={{
              display: "flex",
              marginBottom: "10px",
              gap: "10px",
            }}
          >
            <FormControl
              sx={{
                width: "200px",
                borderRadius: "4px",
                background: darkMode ? "#232323" : "#fff",
              }}
              size="small"
            >
              <InputLabel
                sx={{ color: darkMode ? "#fff" : "#000" }}
                id="demo-simple-select-label"
              >
                Pairs
              </InputLabel>
              <Select
                sx={{
                  color: darkMode ? "#fff" : "#000",
                  ".MuiSvgIcon-root": {
                    color: darkMode ? "#fff" : "#000",
                  },
                }}
                MenuProps={menuProps}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pair}
                label="Pairs"
                onChange={handleChange}
                IconComponent={(props) => (
                  <ArrowDropDownIcon
                    {...props}
                    sx={{ color: darkMode ? "#fff" : "#000" }}
                  />
                )}
              >
                {pairArray?.map((item, i) => (
                  <MenuItem
                    key={i}
                    value={item}
                    sx={{ color: darkMode ? "#fff" : "#000" }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginBottom: "10px",
            }}
          >
            <TitleFirst
              sx={{
                color: !darkMode ? "#838595d4" : "#bdbdbd",
                fontSize: "11px",
              }}
            >
              Price({bidAsk?.currency2})
            </TitleFirst>
            <TitleMid
              sx={{
                color: !darkMode ? "#838595d4" : "#bdbdbd",
                fontSize: "11px",
              }}
            >
              Amounts({bidAsk?.currency1})
            </TitleMid>
            <Titlethird
              sx={{
                color: !darkMode ? "#838595d4" : "#bdbdbd",
                fontSize: "11px",
              }}
            >
              Total
            </Titlethird>
          </Box>
          <OrderBook
            darkMode={darkMode}
            title={"Ask"}
            data={bidAsk?.asks}
          />
          {currentPrice && (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "20px",
                paddingY: "5px",
                color: "#1976d2 ",
              }}
            >
              {currentPrice} Current
            </Typography>
          )}
          <OrderBook
            darkMode={darkMode}
            color={"#00b746"}
            title={"Bid"}
            data={bidAsk?.bids}
          />
        </LeftWrapper>
        <RightWrapper>
          <Chart darkMode={darkMode} />
          <OrderBookingWindow />
        </RightWrapper>
      </Container>
      <HistoryTable title={"Order History"} data={orderOpenList} />
    </>
  );
};

export default Dashboard;
