import { Grid } from "@mui/material";
import React from "react";
import backgroundImage from "../../infrastructure/assets/MacBook_Pro_16_2.jpg";

const BackgroundImage: React.FC = () => (
  <Grid
    item
    xs={false}
    sm={4}
    md={6}
    lg={8}
    xl={8}
    sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
    }}
  />
);

export default BackgroundImage;
