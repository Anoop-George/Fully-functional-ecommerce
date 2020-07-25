import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function About() {
  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={12}>
          <div className="container">
            <img src="/media/images/winter.jpg" style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "6vw",
                  color: "#f0f0f5",
                }}
              >
                ELECTRO WORLD
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src="/media/images/shop.jpg" style={{ width: "100%" }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ margin: "auto", width: "60%" }}>
          <Typography
            variant="h6"
            style={{
              color: "#191936",
              fontFamily: "Alfa Slab One",
            }}
          >
            ABOUT OUR ELECTRO WORLD
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elPellentesque
            vehicula augue eget nisl ullamcorper, molestie blandit ipsum auctor.
            Mauris volutpat augue dolor.. Consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut lab ore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco. labore et dolore
            magna aliqua.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src="/media/images/slide-1.jpg" style={{ width: "100%" }} />
            <div className="centered">
              <Typography
                style={{
                  fontFamily: "Alfa Slab One",
                  fontSize: "3vw",
                  color: "#ad0e2b",
                }}
              >
                DELIGHTMENT
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="container">
            <img src="/media/images/slide-3.jpg" style={{ width: "100%" }} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
