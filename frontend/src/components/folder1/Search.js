import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() => ({
  image: {
    width: "50%",
    maxWidth: "200px",
    float: "left",
  },
  clearfix: {
    overflow: "auto",
  },
}));

function Search(props) {
  const classes = useStyles();
  const searchdata = props.match.params.id.substring(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`api/Search/${searchdata}/`).then((r) => setData(r.data));
  }, [searchdata]);
  return (
    <div>
      <Grid
         spacing={2}
         container
         direction="row"
         justify="center"
         alignItems="flex-start"
      >
        {data.map((item) => {
          return (
            <Grid item xs={12} sm={3} key={item.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: `/productDetails/:${item.id}` }}
            >
              <Card>
                <img
                  src={item.photo}
                  style={{ width: "50%", height: "auto" }}
                />
                <CardContent>
                  <Typography style={{ color: "darkblue" }} variant="body1">
                    {item.name}
                  </Typography>
                  <Typography style={{ color: "blue" }} variant="body2">
                    Brand: {item.brand}
                  </Typography>

                  <Typography
                    style={{ float: "right", color: "#b0a627" }}
                    variant="caption"
                  >
                    Price : {item.price} USD
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          );
        })}

        {data.length < 1 ? (
          <Typography variant="body1" style={{ margin: 9 }}>
            My be it takes long time to load or no results found{" "}
          </Typography>
        ) : null}
      </Grid>
    </div>
  );
}

export default Search;
