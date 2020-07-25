import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

function SingleLineGridList() {
  const [imagelist, setImagelist] = useState([]);
  useEffect(() => {
    axios
      .get("api/FeaturedProducts/")
      .then((res) => setImagelist(res.data.results));
  }, []);
  return (
    <div>
      <Grid
        spacing={2}
        style={{ marginTop: 4 }}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {imagelist.map((content) => {
          return (
            <Grid item xs={6} sm={3} key={content.id}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: `/productDetails/:${content.id}` }}
              >
                <Card>
                  <img
                    src={content.photo}
                    style={{ width: "50%", height: "auto" }}
                  />
                  <CardActions>
                    <Typography style={{ color: "darkblue" }} variant="body1">
                      {content.name}
                    </Typography>
                    <Typography
                      style={{ float: "right", color: "#b0a627" }}
                      variant="caption"
                    >
                      Price : {content.price} USD
                    </Typography>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default SingleLineGridList;
