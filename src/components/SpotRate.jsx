import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getBackgroundColor = (change) => {
    if (change === "up") {
      return "green"; // Green color for increase
    } else if (change === "down") {
      return "red"; // Red color for decrease
    }
    return ""; // White color for no change
  };

  const getColor = (change) => {
    if (change === "up") {
      return "white"; // Green color for increase
    } else if (change === "down") {
      return "white"; // Red color for decrease
    }
    return "white"; // Default color for no change
  };

  const renderSpotSection = (metal, data) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Spot rate section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          padding: "0.5vw 1.5vw",
          width: "100%",
          border: "4px solid rgb(196, 151, 5)",
        }}
      >
        <Box className="flex flex-col items-center">
          <Typography
            sx={{ color: "#FFFFFF", fontSize: "2.1vw", fontWeight: "600" }}
          >
            {metal.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "1.6vw",
              marginTop: "-10px",
            }}
          >
            Oz
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px",
              borderRadius: "8px",
              fontSize: "2vw",
              fontWeight: "bold",
              margin: "1vw 0",
              color: getColor(data.bidChanged),
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: "3px solid #FFFFFF",
              width: "10vw",
            }}
          >
            {data.bid}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.3vw",
                color: "white",
                fontWeight: "bold",
                marginLeft: "0.5vw",
              }}
            >
              LOW {data.low}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px",
              borderRadius: "8px",
              fontSize: "2vw",
              fontWeight: "bold",
              margin: "1vw 0",
              color: getColor(data.askChanged),
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: "3px solid #FFFFFF",
              width: "10vw",
            }}
          >
            {data.ask}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              borderRadius: "5px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "1.3vw",
                color: "white",
                fontWeight: "bold",
                marginLeft: "0.5vw",
              }}
            >
              HIGH {data.high}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      className="p-3 mx-auto text-center mt-6"
      sx={{
        maxWidth: "100%",
        border: "4px solid rgb(196, 151, 5)",
      }}
    >
      <Box
        className="flex flex-row items-center justify-center w-full pl-9 pr-9 p-1"
        sx={{
          background:
            "linear-gradient(to right, rgb(178, 129, 44) 0px, rgb(244, 222, 98) 28%, rgb(244, 226, 139) 51%, rgb(244, 222, 98) 71%, rgb(178, 129, 44) 100%)",
          border: "4px solid rgb(196, 151, 5)",
        }}
      >
        {/* Label section */}
        <Typography
          sx={{
            fontSize: "2.2vw",
            fontWeight: "600",
            color: "#000000",
          }}
        >
          SPOT RATE
        </Typography>
      </Box>
      <Box
        className="flex flex-row items-center justify-between"
        sx={{ backgroundColor: "transparent", padding: "10px 10px" }}
      >
        <Box sx={{ width: "120px" }}></Box>
        <Box className="flex flex-row items-center justify-center w-40">
          <Typography
            sx={{
              fontSize: "1.5vw",
              fontWeight: "bold",
              color: "white",
            }}
          >
            BID
          </Typography>
          <Box
            className="flex justify-center items-center"
            sx={{
              marginLeft: "0.5vw",
              backgroundColor: "#FFFFFF",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              fontSize: "1.4vw",
              fontWeight: "700",
              color: "black",
            }}
          >
            $
          </Box>
        </Box>

        <Box className="flex flex-row items-center justify-center w-40">
          <Typography
            sx={{
              fontSize: "1.5vw",
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
            }}
          >
            ASK
          </Typography>
          <Box
            className="flex justify-center items-center"
            sx={{
              marginLeft: "0.5vw",
              backgroundColor: "#FFFFFF",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              fontSize: "1.4vw",
              fontWeight: "700",
              color: "black",
            }}
          >
            $
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0px 0px 0px 0px",
          gap: "0.9vw",
        }}
      >
        {renderSpotSection("gold", goldData)}
        {renderSpotSection("silver", silverData)}
      </Box>
    </Box>
  );
};

export default SpotRate;
