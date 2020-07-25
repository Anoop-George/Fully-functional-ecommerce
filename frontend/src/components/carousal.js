import React, { useState, useMemo,useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../../static/frontend/maincss.css";

function Carousal() {
  const [imageIndex, setImageIndex] = React.useState(0);
  const texts = ["World of Electronics", "The top Brands", "Casual Shopping"];

  const images = [
    "/media/images/banner1.jpg",
    "/media/images/banner2.jpg",
    "/media/images/banner3.jpg",
  ];

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setImageIndex((imageIndex+1) %images.length);
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [imageIndex])


  return (
    <div>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={11} sm={12}>
          <div className="container">
            <img
              src={images[imageIndex]}
              alt={images[imageIndex]}
              style={{ width: "100%" }}
            />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "5vw",
                  color: "#dae3f2",
                }}
              >
                {texts[imageIndex]}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Carousal;
