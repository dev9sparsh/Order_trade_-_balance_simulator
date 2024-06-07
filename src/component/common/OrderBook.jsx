import { Box, Typography } from "@mui/material";
import React from "react";
import { TitleFirst, TitleMid, Titlethird } from "../../Style";

const OrderBook = ({ title, data, color, darkMode }) => {
  return (
    <Box>
      <Typography
        sx={{
          color: darkMode ? "#fff" : "#000",
          fontSize: "14px",
          marginBottom: "10px",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {data
        ?.slice(0, 15)
        .reverse()
        ?.map((item, index) => (
          <Box key={index} sx={{ display: "flex" }}>
            <TitleFirst sx={{ color }}>{item?.[0]}</TitleFirst>
            <TitleMid Mode={darkMode}>{parseFloat(item?.[1])}</TitleMid>
            <Titlethird Mode={darkMode}>
              {parseFloat(item?.[0] * item?.[1])}
            </Titlethird>
          </Box>
        ))}
    </Box>
  );
};

OrderBook.defaultProps = { 
  title: "", 
  data: [], 
  color: "", 
  darkMode: "" 
};
export default OrderBook;
