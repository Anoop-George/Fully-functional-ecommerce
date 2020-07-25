import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

function FeatureBanner() {
  const [images, setImage] = useState([]);
  useEffect(() => {
    axios.get("api/banner").then((r) => setImage(r.data.results));
  }, []);
  return (
    <div>
    
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="row"
      >
        {images.map((image) => {
          return (
            <Grid item xs={12} sm={4} key={image.id}>
              <img
                style={{ height: "auto", width: "100%" }}
                src={image.Image}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default FeatureBanner;
