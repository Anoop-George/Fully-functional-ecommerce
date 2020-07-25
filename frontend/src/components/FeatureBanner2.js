import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

function FeatureBanner2() {
  const images = [
    { image: "/media/images/p1.jpg", text: "Top Brands under a Umbrella" },
    { image: "/media/images/p2.jpg", text: "Latest Fashion Trends" },
    { image: "/media/images/p3.jpg", text: "Style that inspires" },
    { image: "/media/images/p4.jpg", text: "LifeStyle that satisfies" },
  ];

  return (
    <div>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="row"
        style={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src={images[0].image} style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "4vw",
                  color: "#dae3f2",
                }}
              >
                {images[0].text}
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src={images[1].image} style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "4vw",
                  color: "#f0b9bb",
                }}
              >
                {images[1].text}
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src={images[2].image} style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "4vw",
                  color: "#b2b2db",
                }}
              >
                {images[2].text}
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src={images[3].image} style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "4vw",
                  color: "#252540",
                }}
              >
                {images[3].text}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FeatureBanner2;
