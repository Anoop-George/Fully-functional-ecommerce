import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

function Orders() {
  const [url, setUrl] = useState("api/PoUserTracking/");
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [data, setData] = useState([]);
  const [itemdelete, setDelete] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then((r) => {
        setData(r.data.results);
        setNext(r.data.next);
        setPrevious(r.data.previous);
      });
  }, [url, itemdelete]);
  //
  const cancelpo = (id) => {
    axios
      .delete(`api/PoUserUpdate/${id}/`, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then(() => {
        setDelete("The item has been removed");
      })
      .catch(() => setDelete("Error deleting item"));
  };
  //

  return (
    <div>
     
      {itemdelete ? (
        <div style={{ backgroundColor: "#ffded1", margin: 5, padding: 5 }}>
          <Typography variant="body1">{itemdelete}</Typography>
          <Button variant="outlined" onClick={() => setDelete(null)}>
            dismiss
          </Button>
        </div>
      ) : null}
      {data.length < 1 ? (
        <Typography>You have no purchase order history</Typography>
      ) : null}
      <Grid container direction="row" justify="center" alignItems="center">
        {data.map((item) => {
          return (
            <div key={uuidv4()}>
              <Grid item xs={12} sm={11}>
                <Paper
                  variant="outlined"
                  elevation={3}
                  style={{ margin: 3, padding: 4 }}
                >
                  <Typography variant="body1">
                    {" "}
                    Order Number : {item.id}{" "}
                  </Typography>
                  <Typography variant="h6" color='primary' >
                    {" "}
                    Product Name : {item.name}{" "}
                  </Typography>
                  {item.accepted ? (
                    <Typography variant="body1">
                      {" "}
                      Status : Product order accepted{" "}
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {" "}
                      Status : Product order pending for approval{" "}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {" "}
                    Purchase order created Date : {item.created}{" "}
                  </Typography>
                  {item.delivered ? (
                    <Typography variant="body1">
                      {" "}
                      Delivary status : Product delivered{" "}
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      {" "}
                      Delivary status : Product yet to be delivered
                    </Typography>
                  )}
                  {item.payment ? (
                    <Typography variant="body1">
                      {" "}
                      Payment method : Online{" "}
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      Payment method : Cash on Delivary
                    </Typography>
                  )}
                  <Typography variant="body1">
                    {" "}
                    Quantity : {item.quantity}{" "}
                  </Typography>
                  {item.rejected ? (
                    <Typography variant="body1">
                      {" "}
                      {item.rejected_reason}{" "}
                    </Typography>
                  ) : null}
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => cancelpo(item.id)}
                  >
                    {" "}
                    cancel{" "}
                  </Button>
                  <Button>
                    {" "}
                    <Link to={{ pathname: `/Addcomment:${item.product}` }}>
                      add comment & Rating
                    </Link>{" "}
                  </Button>
                </Paper>
              </Grid>
              <Divider />
            </div>
          );
        })}

        <Grid item xs={11} sm={11}>
          {data.length >= 1 ? (
            <div>
              <Button
                onClick={() => setUrl(previous)}
                style={{ margin: 5 }}
                size="small"
                variant="contained"
                color="secondary"
              >
                previous
              </Button>
              <Button
                onClick={() => setUrl(next)}
                style={{ margin: 5 }}
                size="small"
                variant="contained"
                color="primary"
              >
                next
              </Button>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
