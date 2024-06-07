
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState, useContext } from "react";
import { Box, IconButton, InputAdornment } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SearchTextField, FieldTitle } from "../../Style";
import { Context } from "../../context/context";

function NavBar() {
  const { balance, setBalance, darkMode, setDarkMode, pair, currentPrice } =
    useContext(Context);
  const [isInputShow, setIsInputShow] = useState(false);
  const [value, setValue] = useState(balance);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };


  useEffect(() => {
    setValue(balance);
  }, [balance]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleSubmit = () => {
    setBalance(Number(value));
    setIsInputShow(false);
  };

  return (
    <AppBar
      sx={{
        background: darkMode ? "#000" : "#fff",
        position: "fixed",
        boxShadow: "none",
        borderBottom: darkMode ? "1px solid #323131d9" : "1px solid #e7e7e7d9",
        zIndex: 999,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
          disableGutters
        >
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#1976d2",
              textDecoration: "none",
            }}
          >
            {pair?.split("-")?.[0]}/{pair?.split("-")?.[1]} {currentPrice}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontWeight: 600,
              color: "#1976d2",
              textDecoration: "none",
            }}
          >
            Order Trade & Balance Simulator
          </Typography>
          <Box sx={{ display: "flex" }}>
            {isInputShow ? (
              <SearchTextField
                onChange={handleChange}
                Mode={darkMode}
                value={value}
                size="small"
                required
                id="outlined-required"
                label="Amount"
                defaultValue=""
                InputLabelProps={{
                  sx: {
                    color: !darkMode ? "#000" : "#fff",
                  },
                }}
                inputProps={{
                  style: {
                    color: !darkMode ? "#000" : "#fff",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FieldTitle Mode={darkMode}>USD</FieldTitle>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      onClick={handleSubmit}
                      sx={{ cursor: "pointer" }}
                      position="end"
                    >
                      <FieldTitle Mode={darkMode}>Submit</FieldTitle>
                    </InputAdornment>
                  ),
                  sx: { fontSize: "14px" },
                }}
              />
            ) : (
              <Typography
                onClick={() => setIsInputShow(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: darkMode ? "#fff" : "#00000095",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#00b746" }}>
                  Balance
                </Typography>{" "}
                {typeof balance === "number" ? balance?.toFixed(3) : balance}{" "}
                USD
              </Typography>
            )}
            <IconButton sx={{ marginLeft: "10px" }} onClick={toggleDarkMode}>
              {!darkMode ? (
                <Brightness7Icon sx={{ color: darkMode ? "#fff" : "#000" }} />
              ) : (
                <Brightness4Icon
                  sx={{ color: darkMode ? "#fff" : "#f3c461" }}
                />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
