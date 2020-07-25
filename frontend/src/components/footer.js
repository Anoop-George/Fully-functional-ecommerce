import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CSRF_TOKEN } from "./common/csrf_token";
import userstatus from "../action/userLogincheck";

const useStyles = makeStyles(() => ({
  body1: { marginLeft: 16 },
}));

function FooterComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let state = useSelector((state) => state.userloginstatus.loggedin);
  useEffect(() => {
    axios
      .get("accounts/userstatuscheck/", {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then((r) => {
        if (r.data.status == "true") {
          dispatch(userstatus(true));
        } else {
          dispatch(userstatus(false));
        }
      });
  }, []);

  return (
    <div style={{ marginTop: "100px", position: "relative" }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: "#3b4066", color: "white" }}
      >
        <Grid item xs={12} sm={6}>
          <Typography variant="h6"> Electro world</Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            We create endless possibilities
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" style={{ marginTop: 5 }}>
            {" "}
            Visit
          </Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            Street name
          </Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            City name
          </Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            Country name
          </Typography>
          <Typography variant="body1"> Mobile number</Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            134365789s
          </Typography>
          <Typography variant="body1"> Email</Typography>
          <Typography className={classes.body1} variant="body1">
            {" "}
            test@test.com
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default FooterComponent;
