import { Box } from "@mui/material";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { resolutionArr } from "../../utils/data";
import { Context } from "../../context/context";
import { ResolutionButton } from "../../Style";

const Chart = ({ darkMode }) => {
  const { candles, resolution, setResolution } = useContext(Context);

  const seriesArr = candles?.map((item) => {
    return {
      x: new Date(item?.timestamp),
      y: [item?.open, item?.high, item?.low, item?.close],
    };
  });

  const series = [
    {
      data: seriesArr,
    },
  ];

  // Function to get chart options based on dark mode
  const getChartOptions = (darkMode) => {
    return {
      chart: {
        type: "candlestick",
        background: darkMode ? "#1e1e1e" : "#fff",
        height: 350,
      },
      title: {
        text: "Candlestick Chart",
        align: "left",
        style: {
          color: darkMode ? "#a7a7a7" : "#373d3f",
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: darkMode ? "#a7a7a7" : "#373d3f",
          },
        },
        axisBorder: {
          color: darkMode ? "#555" : "#e0e0e0",
        },
        axisTicks: {
          color: darkMode ? "#555" : "#e0e0e0",
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: darkMode ? "#a7a7a7" : "#373d3f",
          },
        },
      },
      grid: {
        borderColor: darkMode ? "#444" : "#e0e0e0",
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: darkMode ? "#00c853" : "#00e676",
            downward: darkMode ? "#ff3d00" : "#ff1744",
          },
        },
      },
      tooltip: {
        theme: darkMode ? "dark" : "light",
      },
    };
  };

  return (
    <>
      <Box
        sx={{
          border: darkMode ? "1px solid #323131d9" : "1px solid #bbb4b4d9",
          padding: "8px",
          backgroundColor: darkMode ? "#2c2c2c" : "#fff",
        }}
        id="chart"
      >
        {resolutionArr?.map((item, i) => (
          <ResolutionButton
            sx={{
              color: darkMode
                ? resolution.resolution === item?.resolution
                  ? "#000"
                  : "#fff"
                : resolution.resolution === item?.resolution
                ? "#000"
                : "#00000099",
              bgcolor: resolution.resolution === item?.resolution && "#e1dcdc",
            }}
            onClick={() => setResolution(item)}
            key={i}
          >
            {item?.resolution}
          </ResolutionButton>
        ))}
        <ReactApexChart
          options={getChartOptions(darkMode)}
          series={series}
          type="candlestick"
          height={350}
        />
      </Box>
      <Box id="html-dist"></Box>
    </>
  );
};


Chart.defaultProps = {
  darkMode: "",
};

export default Chart;
