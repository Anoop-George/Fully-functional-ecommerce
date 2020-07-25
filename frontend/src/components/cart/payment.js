import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token";
import cartActions from "../../action/cartActions";

function Payment() {
  let items = useSelector((state) => state.cart.items);
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  const casheondelivary = async () => {
    for (let item of items) {
      const endpoint = "/api/CartCreateApi/";
      let data = {
        product: item.id,
        quantity: item.quantity,
        cashondelivary: true,
        name: item.name,
      };
      await axios
        .post(endpoint, data, {
          headers: {
            "content-type": "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
        })
        .then(() => {
          if (item == items[items.length - 1]) {
            setResult(
              "You have successfully placed the order,update your profile address for the delivary if you have't done before"
            );
            dispatch(cartActions.removeall());
          }
        })
        .catch(() => setResult("There is error placing the error"));
    }
  };
  //

  const payonline = async () => {
    for (let item of items) {
      const endpoint = "/api/CartCreateApi/";
      let data = {
        product: item.id,
        quantity: item.quantity,
        cashondelivary: false,
        name: item.name,
      };
      await axios
        .post(endpoint, data, {
          headers: {
            "content-type": "application/json",
            "X-CSRFTOKEN": CSRF_TOKEN,
          },
        })
        .then(() => {
          if (item == items[items.length - 1]) {
            window.location.assign("api/HomeView/");
          }
        })
        .catch(() => setResult("There is error placing the error"));
    }
  };

  //

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={8}
          style={{ backgroundColor: "#e6f5ea", padding: 4 }}
        >
          <Typography variant="body1"> Cash on Delivary </Typography>
          <Typography variant="body2">
            {" "}
            If all items are under cash on delivary please proceed otherwise
            after order it will be declined{" "}
          </Typography>
          <Button
            onClick={() => casheondelivary()}
            size="small"
            variant="contained"
            color="primary"
          >
            {" "}
            Proceed with Cash on delivary
          </Button>
          {result ? (
            <div
              style={{
                backgroundColor: "white",
                color: "#403f5e",
                margin: 4,
                padding: 3,
              }}
            >
              {" "}
              <Typography variant="body1">Message : {result} </Typography>
              <Button
                size="small"
                color="secondary"
                onClick={() => setResult(null)}
              >
                dismiss
              </Button>
              <Button size="small" color="secondary">
                <a href="/accounts/profile">update address</a>
              </Button>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={8} style={{ margin: 5, padding: 4 }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => payonline()}
          >
            pay online
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Payment;
