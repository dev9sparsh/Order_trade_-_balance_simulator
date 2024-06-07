import {
  Box,
  Button,
  IconButton,
  TableCell,
  TextField,
  Typography,
  styled,
} from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  marginTop: "60px",
  gap: "10px",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
  },
}));

export const LeftWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "270px;",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "320px",
  },
}));

export const RightWrapper = styled(Box)(({ theme }) => ({
  width: "75%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const Card = styled(Box)(({ Mode }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "20px",
  border: Mode ? "1px solid #323131d9" : "1px solid #bbb4b4d9",
}));
export const TextFieldWrapper = styled(Box)({
  flexDirection: "column",
  display: "flex",
  width: "100%",
  gap: "20px",
});

export const TitleFirst = styled(Typography)({
  minWidth: "70px",
  width: "70px",
  color: "#ef3f3c",
  cursor: "pointer",
  fontSize: "12px",
  lineHeight: 1.2,
  fontWeight: 600,
});

export const TitleMid = styled(Typography)(({ Mode }) => ({
  color: Mode ? "#fff" : "#000",
  width: "100px",
  textAlign: "end",
  fontSize: "12px",
  cursor: "pointer",
  lineHeight: 1.7,
  fontWeight: 600,
}));

export const Titlethird = styled(Typography)(({ Mode }) => ({
  color: Mode ? "#fff" : "#000",
  minWidth: "120px",
  width: "55%",
  textAlign: "end",
  fontSize: "12px",
  cursor: "pointer",
  lineHeight: 1.7,
  fontWeight: 600,
}));

export const BuyButton = styled(Button)(({ colorGreen }) => ({
  textTransform: "capitalize",
  background: "#000",
  borderRadius: "5px",
  height: "40px",
  fontWeight: 600,
  fontSize: "12px",
  color: "#fff",
  backgroundColor: colorGreen ==="green" ? "#07a643" : "#e62c29",
  border: 0,
  "&:hover": {
    backgroundColor: colorGreen ==="green" ? "#00b746d9" : "#ef3f3cd9",
    color: "#fff",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    color: "#000",
  },
}));
export const SellButton = styled(Button)({
  textTransform: "capitalize",
  background: "#e1dcdc",
  borderRadius: "5px",
  height: "40px",
  fontWeight: 600,
  fontSize: "12px",
  color: "#000",
  border: 0,
  "&:hover": {
    backgroundColor: "#d3cdcd",
  },
});
export const ResolutionButton  = styled(Button)({
  padding: "2px",
  minWidth: "30px",
  marginRight: "16px",
  marginBottom: "4px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#ccc",
    color: "#000"
  },
});

export const Btn = styled(Button)(({ Mode }) => ({
  textTransform: "capitalize",
  whiteSpace: "nowrap",
  borderRadius: "15px",
  fontWeight: 600,
  fontSize: "12px",
  padding: "4px 14px",
  color: Mode ? "#fff" : "#000",
  border: 0,
  "&:hover": {
    backgroundColor: Mode ? "#232323" : "#d3cdcd",
    color: Mode ? "#fff" : "#000",
  },
}));

export const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

export const TripleLineButton = styled(IconButton)({
  width: "35px",
  height: "35px",
  borderRadius: "5px",
  gap: "2px",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "#f1f2f4",
  },
});
export const TripleLine = styled(Box)({
  background: "gray",
  height: "2px",
  width: "15px",
});


export const TableCells = styled(TableCell)(({ Mode }) => ({
  color: Mode ? "#fff" : "gray",
  borderBottom: Mode ? "1px solid #2d2b2b" : "",
}));

export const FieldTitle = styled(Typography)(({ Mode }) => ({
  color: Mode ? "#fff" : "#000",
  fontSize: "14px",
}));

export const SearchTextField = styled(TextField)(({ Mode }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: Mode ? "#232323" : "#fff",
    height: "40px",
    "& > fieldset": {
      borderColor: Mode ? "#000" : "gray",
    },
    "&.Mui-disabled": {
      color: "gray",
      "& .MuiInputBase-input": {
        WebkitTextFillColor: "gray",
      },
      "& > fieldset": {
        borderColor: "gray",
      },
    },
    "& .MuiInputBase-input": {
      background: Mode ? "#232323" : "#fff",
      color: !Mode ? "#000" : "#fff",
      "&:-webkit-autofill": {
        backgroundColor: Mode ? "#232323 !important" : "#fff !important",
        WebkitBoxShadow: `0 0 0 100px ${Mode ? "#232323" : "#fff"} inset`,
        borderRadius: 0,
        WebkitTextFillColor: !Mode ? "#000" : "#fff",
      },
      "&:-webkit-autofill:hover": {
        backgroundColor: Mode ? "#232323 !important" : "#fff !important",
        WebkitBoxShadow: `0 0 0 100px ${Mode ? "#232323" : "#fff"} inset`,
        WebkitTextFillColor: !Mode ? "#000" : "#fff",
      },
      "&:-webkit-autofill:focus": {
        backgroundColor: Mode ? "#232323 !important" : "#fff !important",
        WebkitBoxShadow: `0 0 0 100px ${Mode ? "#232323" : "#fff"} inset`,
        WebkitTextFillColor: !Mode ? "#000" : "#fff",
      },
    },
  },
}));
