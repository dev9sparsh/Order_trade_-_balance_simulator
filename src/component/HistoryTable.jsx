import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from "@mui/material";
import { Btn, TableCells } from "../Style";
import { tableHeading } from "../utils/data";
import { Context } from "../context/context";

function HistoryTable({ title }) {
  const {
    pair,
    darkMode,
    orderOpenList: data,
    setOrderOpenList,
    coinAmounts,
    setCoinAmounts,
    balance,
    setBalance,
    handleClickVariant,
  } = useContext(Context);

  const handleCancel = (id, i) => {
    if (id?.includes("_ask_id")) {
      const cancelArrAsk = data?.map((item) => {
        return item.id === id
          ? { ...item, status: "Cancelled", action: false }
          : { ...item };
      });
      setCoinAmounts({
        ...coinAmounts,
        [pair]: coinAmounts[pair] + data[i]?.amount,
      });
      setOrderOpenList(cancelArrAsk);
    } else {
      const cancelArr = data?.map((item) => {
        return item.id === id
          ? { ...item, status: "Cancelled", action: false }
          : { ...item };
      });
      setBalance(balance + data[i]?.total);
      setOrderOpenList(cancelArr);
    }
    handleClickVariant("error", "Your order has been cancelled!");
  };

  return (
    <>
      <Box
        sx={{
          gap: "20px",
          display: "flex",
          flexrap: "wrap",
          paddingLeft: "20px",
          borderTop: darkMode ? "1px solid #323131d9" : "1px solid #bbb4b4d9",
          padding: "18px",
        }}
      >
        <Btn Mode={darkMode}>{title}</Btn>
      </Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ background: darkMode ? "#171717;" : "#fff" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {tableHeading?.map((item, i) => (
                  <TableCells
                    Mode={darkMode}
                    key={i}
                    sx={{ fontWeight: 600 }}
                    align={i === 0 ? "" : "right"}
                  >
                    {item}
                  </TableCells>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((_, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCells Mode={darkMode} component="th" scope="row">
                    {data[data?.length - i - 1].id}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].pair}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].side}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].type}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].date}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].price}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].amount}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].total}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].status}
                  </TableCells>
                  <TableCells Mode={darkMode} align="right">
                    {data[data?.length - i - 1].action && (
                      <Btn
                        onClick={() =>
                          handleCancel(
                            data[data?.length - i - 1]?.id,
                            data?.length - i - 1
                          )
                        }
                        sx={{
                          bgcolor: "#ff2e3f",
                          color: "#fff",
                          "&:hover": {
                            bgcolor: !darkMode ? "#dd0000cc" : "#cd0303",
                            color: "#fff",
                          },
                        }}
                      >
                        Cancel
                      </Btn>
                    )}
                  </TableCells>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default HistoryTable;
