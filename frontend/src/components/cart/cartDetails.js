import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import cartAction from "../../action/cartActions";

function CartDetails() {
  let items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let sum = items.map((item) => {
      return Number(item["price"]) * Number(item["quantity"]);
    });

    if (sum.length >= 1) {
      let total = sum.reduce((a, b) => {
        return a + b;
      });
      setAmount(total);
    } else {
      setAmount(0);
    }
    // if (items.length >= 0) {
    //   localStorage.clear();
    //   localStorage.setItem("itemsofflowercart", JSON.stringify(items));
    // }
  }, [items]);

  return (
    <Grid
      container
      style={{ marginTop: "10px" }}
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{ marginBottom: 6 }}
    >
     
      <Grid item xs={12} sm={5}>
        <Typography variant="h6" gutterBottom style={{ padding: "3px" }}>
          Shopping Cart{" "}
        </Typography>
        {items.map((product) => {
          return (
            <Paper key={product.uuid}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3} sm={3}>
                  <img
                    src={product.image}
                    style={{
                      maxWidth: "90px",
                      maxHeight: "90px",
                      padding: "3px",
                      marginTop: "4px",
                    }}
                  />
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography variant="body1" display="block" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    color="primary"
                    variant="h6"
                    gutterBottom
                    style={{ float: "right" }}
                  >
                    {" "}
                    ${product.price}{" "}
                  </Typography>
                </Grid>
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ marginLeft: "3px", color: "blue" }}
                >
                  Sold by: FlowerCarts
                </Typography>

                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ marginLeft: "3px", color: "brown" }}
                >
                  Qty : {product.quantity}
                </Typography>
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => {
                    dispatch(cartAction.remove(product.uuid));
                  }}
                  style={{ float: "right", marginLeft: "18%" }}
                >
                  {" "}
                  remove{" "}
                </Button>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
      <Grid item xs={12} sm={3} align="center">
        {items.length > 0 ? (
          <React.Fragment>
            <Paper>
              <Typography
                style={{ padding: "6px" }}
                variant="h6"
                display="block"
                gutterBottom
              >
                {" "}
                Total{" "}
              </Typography>
              <Typography
                style={{ padding: "10px" }}
                variant="h5"
                display="block"
                gutterBottom
              >
                {" "}
                {amount}{" "}
              </Typography>
            </Paper>

            <Link
              style={{ textDecoration: "none" }}
              to={{
                pathname: "/Payment",
                state: { amount: amount },
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#5dd916", color: "white" }}
              >
                proceed to checkout{" "}
              </Button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Paper>
              <Typography
                style={{ padding: "6px" }}
                variant="body1"
                display="block"
                gutterBottom
              >
                {" "}
                Your Cart is empty{" "}
              </Typography>
            </Paper>
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
}

export default CartDetails;
