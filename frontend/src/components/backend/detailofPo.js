import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSRF_TOKEN } from "../common/csrf_token";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
function DetailsofPO(props) {
  const poid = parseInt(props.match.params.id.substring(1), 10);

  const [item, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [rej, setRej] = useState("");
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/PODetails/${poid}/`, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then((r) => {
        setData(r.data);
      });
  }, [change]);
  //
  const update = (data) => {
    if (data == "accept") {
      item.accepted = true;
    } else if (data == "reject") {
      item.rejected = true;
    } else if (data == "delivered") {
      item.delivered = true;
    } else if (data == "rejected_reason") {
      item.rejected_reason = rej;
    }

    axios
      .put(`/api/PODetails/${poid}/`, item, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then(() => {
        setChange(!change);
        setFeedback("Recorded");
      })
      .catch(() => {
        setFeedback("Error happened");
      });
  };
  //
  const deleteitem = () => {
    axios
      .delete(`/api/PODetails/${poid}/`, {
        headers: {
          "content-type": "application/json",
          "X-CSRFTOKEN": CSRF_TOKEN,
        },
      })
      .then(() => {
        setData([]);
        setFeedback("deleted");
      })
      .catch(() => {
        setFeedback("Error happened");
      });
  };
  //
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid
          item
          xs={12}
          sm={4}
          key={item.id}
          style={{ padding: 4, marginTop: 8 }}
        >
          <Paper elevation={1}>
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: `/ProfileDetails:${item.user}` }}
            >
              <Typography>User Details</Typography>
            </Link>
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
              <Typography> Acceptance status:{item.rejected_reason}</Typography>
            ) : null}
            <div></div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ margin: 2 }}
              onClick={() => update("accept")}
            >
              accept order
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ margin: 2 }}
              onClick={() => update("reject")}
            >
              Reject Order
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ margin: 2 }}
              onClick={() => update("delivered")}
            >
              Mark Delivered
            </Button>
            <TextField
              id="outlined-basic"
              label="Reason for rejection"
              variant="outlined"
              value={rej}
              onChange={(e) => setRej(e.target.value)}
              style={{ margin: 5 }}
            />
            <Button
              size="small"
              color="primary"
              style={{ margin: 4 }}
              onClick={() => update("rejected_reason")}
              variant="outlined"
            >
              Submit rejection reason
            </Button>

            <Button
              size="small"
              variant="contained"
              color="secondary"
              style={{ margin: 2 }}
              onClick={() => setRemove(true)}
            >
              Delete Order
            </Button>
            {remove ? (
              <div style={{ backgroundColor: "lightgrey" }}>
                <Typography>Are you sure ? </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={{ margin: 2 }}
                  onClick={() => deleteitem()}
                >
                  Delete
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={{ margin: 2 }}
                  onClick={() => setRemove(false)}
                >
                  cancel
                </Button>
              </div>
            ) : null}
          </Paper>
        </Grid>

        <Grid item xs={5} sm={5} style={{ margin: 3 }}>
          {feedback ? (
            <div>
              <Typography style={{ margin: 3 }}>{feedback}</Typography>

              <Button
                size="small"
                style={{ margin: 3 }}
                onClick={() => setFeedback(null)}
              >
                dismiss
              </Button>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsofPO;
