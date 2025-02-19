import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  // Helper function to get bid and ask values based on metal type
  const getBidAskValues = (metal) => {
    if (
      metal === "gold" ||
      metal === "gold kilobar" ||
      metal === "gold ten tola"
    ) {
      return {
        bid: parseFloat(goldData.bid) || 0,
        ask: parseFloat(goldData.ask) || 0,
      };
    } else if (metal === "silver") {
      return {
        bid: parseFloat(silverData.bid) || 0,
        ask: parseFloat(silverData.ask) || 0,
      };
    }
    return { bid: 0, ask: 0 };
  };

  // Helper function to calculate purity power
  const calculatePurityPower = (purityInput) => {
    if (!purityInput || isNaN(purityInput)) return 1;
    return purityInput / Math.pow(10, purityInput.toString().length);
  };

  // Helper function to conditionally round values
  const formatValue = (value, weight) => {
    return weight === "GM" ? value.toFixed(2) : Math.round(value);
  };

  // Helper function to get the correct metal name
  const getMetalName = (metal) => {
    switch (metal.toLowerCase()) {
      case "gold":
        return "GOLD";
      case "gold kilobar":
        return "GOLD";
      case "gold ten tola":
        return "GOLD";
      default:
        return metal.charAt(0).toUpperCase() + metal.slice(1);
    }
  };

  return (
    <TableContainer
      sx={{
        marginTop: "32px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background:
                "linear-gradient(to right, rgb(178, 129, 44) 0px, rgb(244, 222, 98) 28%, rgb(244, 226, 139) 51%, rgb(244, 222, 98) 71%, rgb(178, 129, 44) 100%)",
              "& th": {
                borderBottom: "none",
              },
              border: "4px solid rgb(196, 151, 5)",
            }}
          >
            <TableCell
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "2vw",
                textAlign: "center",
              }}
              colSpan={2}
            >
              COMMODITY
            </TableCell>
            <TableCell
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "2vw",
                textAlign: "center",
              }}
            >
              UNIT
            </TableCell>
            <TableCell
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "2vw",
                textAlign: "center",
              }}
            >
              BID{" "}
              <Typography
                component="span"
                sx={{
                  color: "black",
                  fontSize: "1.2vw",
                }}
              >
                AED
              </Typography>
            </TableCell>
            <TableCell
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: "2vw",
                textAlign: "center",
              }}
            >
              ASK{" "}
              <Typography
                component="span"
                sx={{
                  color: "black",
                  fontSize: "1.2vw",
                }}
              >
                AED
              </Typography>
            </TableCell>
          </TableRow>
          <Box sx={{ height: "15px" }}></Box>
        </TableHead>
        <TableBody>
          {commodities.map((commodity, index) => {
            const { bid, ask } = getBidAskValues(commodity.metal.toLowerCase());
            const {
              unit,
              weight,
              buyCharge,
              sellCharge,
              buyPremium,
              sellPremium,
              purity,
            } = commodity;

            // Ensure all values are numbers
            const unitMultiplier =
              {
                GM: 1,
                KG: 1000,
                TTB: 116.64,
                TOLA: 11.664,
                OZ: 31.1034768,
              }[weight] || 1;

            const weightValue = parseFloat(weight) || 0;
            const purityValue = parseFloat(purity) || 0;
            const purityPower = calculatePurityPower(purityValue);
            const buyChargeValue = parseFloat(buyCharge) || 0;
            const sellChargeValue = parseFloat(sellCharge) || 0;
            const buyPremiumValue = parseFloat(buyPremium) || 0;
            const sellPremiumValue = parseFloat(sellPremium) || 0;

            const biddingValue = bid + buyPremiumValue;
            const askingValue = ask + sellPremiumValue;
            const biddingPrice = (biddingValue / 31.103) * 3.674;
            const askingPrice = (askingValue / 31.103) * 3.674;

            // Calculation of buyPrice and sellPrice
            const buyPrice =
              biddingPrice * unitMultiplier * unit * purityPower +
              buyChargeValue;
            const sellPrice =
              askingPrice * unitMultiplier * unit * purityPower +
              sellChargeValue;

            return (
              <React.Fragment key={index}>
                <TableRow
                  sx={{
                    "& td": {
                      borderBottom: "none",
                    },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#4b026c",
                      "& td": {
                        borderLeft: "4px solid #4b026c",
                        borderRight: "4px solid #4b026c",
                      },
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "#590380",
                      "& td": {
                        borderLeft: "4px solid #590380",
                        borderRight: "4px solid #590380",
                      },
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    {getMetalName(commodity.metal)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "1.4vw",
                      textAlign: "left",
                      paddingLeft: "0px",
                      fontWeight: "bold",
                    }}
                  >
                    {commodity.metal.toLowerCase() === "gold ten tola"
                      ? "TEN TOLA"
                      : purity}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {unit} {weight}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {formatValue(buyPrice, weight)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontSize: "2vw",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {formatValue(sellPrice, weight)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommodityTable;
