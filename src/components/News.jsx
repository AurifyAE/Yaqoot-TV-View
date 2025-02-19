import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        marginTop: "30px",
        border: "4px solid rgb(196, 151, 5)"
      }}
    >
      <Typography
        className="flex justify-center items-center"
        sx={{
          background: "linear-gradient(to right, rgb(178, 129, 44) 0px, rgb(244, 222, 98) 28%, rgb(244, 226, 139) 51%, rgb(244, 222, 98) 71%, rgb(178, 129, 44) 100%)",
          color: "black",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.5vw",
          width: "500px",
          height: "100%",
        }}
      >
        YAQOOT JEWELLERY
      </Typography>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline-block",
            animation: "scroll 40s linear infinite",
            color: "white",
            fontSize: "2vw",
            textAlign: "center",
          }}
        >
          {newsItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                marginRight: "4vw",
                display: "inline-block",
                color: "white",
                fontSize: "2vw",
              }}
            >
              {item.description}
            </Typography>
          ))}
        </Box>
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default NewsTicker;
