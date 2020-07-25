import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

function Polist() {
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState("");
  const [url, setUrl] = useState("api/POLists/");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then((r) => {
        setNext(r.data.next);
        setPrev(r.data.previous);
        setData(r.data.results);
      });
  }, [url]);

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {data.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={4}
              key={item.id}
              style={{ padding: 4, marginTop: 8 }}
            >
              <Paper elevation={1}>
                <Typography>PO reference number : {item.id}</Typography>
                <Typography>Product name : {item.name}</Typography>
                <Typography>Product id : {item.product}</Typography>
                <Typography>Quantity : {item.quantity}</Typography>
                <Typography>Ordered user id :{item.user}</Typography>
                {item.accepted ? (
                  <Typography> Purchase order status:Accepted</Typography>
                ) : (
                  <Typography>Purchase order status:Not Accepted</Typography>
                )}
                {item.cashondelivary ? (
                  <Typography> Payment method:Cash on delivery</Typography>
                ) : (
                  <Typography>Payment method: Online</Typography>
                )}
                <Typography>Created {item.created} </Typography>
                {item.delivered ? (
                  <Typography> Delivery status:Delivered</Typography>
                ) : (
                  <Typography>Delivery status:Not Delivered</Typography>
                )}
                {item.rejected ? (
                  <Typography> Acceptance status:Order Rejected</Typography>
                ) : (
                  <Typography>Acceptance status:Order not rejected</Typography>
                )}
                {item.rejected_reason ? (
                  <Typography>
                    {" "}
                    Acceptance status:{item.rejected_reason}
                  </Typography>
                ) : null}
                <div></div>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  style={{ margin: 2 }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{ pathname: `/DetailsofPO:${item.id}` }}
                  >
                    more actions..
                  </Link>
                </Button>
              </Paper>
            </Grid>
          );
        })}

        <Grid item xs={5} sm={5}>
          <Button
            size="small"
            onClick={() => setUrl(prev)}
            variant="contained"
            color="secondary"
            style={{ margin: 3 }}
          >
            Prev
          </Button>
          <Button
            size="small"
            onClick={() => setUrl(next)}
            variant="contained"
            color="primary"
            style={{ margin: 3 }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Polist;
