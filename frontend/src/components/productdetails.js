import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
// import ReactImageMagnify from "react-image-magnify";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import cartActions from "../action/cartActions";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    maxWidth: "250px",
    height: "auto",
    float: "left",
    maxHeight: "350px",
  },
  avatars: {
    margin: 6,
  },
  iconempty: {
    margin: 2,
  },
}));

function Rating({ data }) {
  // This function indent to display number 0 to 3 based on 'data'
  if (data <= 0) {
    return (
      <div>
        <StarBorderOutlinedIcon style={{ margin: 1 }} />{" "}
        <StarBorderOutlinedIcon style={{ margin: 1 }} />{" "}
        <StarBorderOutlinedIcon style={{ margin: 1 }} />
      </div>
    );
  } else if (0 < data && data <= 1) {
    return (
      <div>
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />{" "}
        <StarBorderOutlinedIcon style={{ margin: 1 }} />{" "}
        <StarBorderOutlinedIcon style={{ margin: 1 }} />
      </div>
    );
  } else if (1 < data && data <= 2) {
    return (
      <div>
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />{" "}
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />{" "}
        <StarBorderOutlinedIcon style={{ margin: 1 }} />
      </div>
    );
  } else if (2 < data && data <= 3) {
    return (
      <div>
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />{" "}
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />{" "}
        <StarIcon style={{ margin: 1, color: "#edcf0e" }} />
      </div>
    );
  } else {
    return <div>No Rating</div>;
  }
}

function Productdetails(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [mainimage, setmainimage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loginrequestpop, setloginrequestpop] = useState(false);
  const postid = parseInt(props.match.params.productid.substring(1), 10);
  let loggedinstatus = useSelector((state) => state.userloginstatus.loggedin);

  const handleClose = () => {
    setloginrequestpop(false);
  };

  useEffect(() => {
    axios
      .get(`api/ProductDetails/${postid}`)
      .then((res) => setProduct(res.data));
  }, []);

  useEffect(() => {
    if (product.photo != undefined) {
      setmainimage(product.photo);
    }
  }, [product]);

  const addtocart = (product, quantity) => {
    if (loggedinstatus) {
      dispatch(cartActions.add(product, quantity));
    } else {
      setloginrequestpop(true);
    }
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ margin: "3px" }}
      >
        <Grid item xs={12} sm={5}>
          {mainimage != "" ? (
            <img className={classes.image} src={mainimage} />
          ) : null}

          <div className={classes.avatars}>
            {product.photo ? (
              <Avatar
                src={product.photo}
                onClick={() => {
                  setmainimage(product.photo);
                }}
              />
            ) : null}
            {product.photo2 ? (
              <Avatar
                src={product.photo2}
                onClick={() => {
                  setmainimage(product.photo2);
                }}
              />
            ) : null}
            {product.photo3 ? (
              <Avatar
                src={product.photo3}
                onClick={() => {
                  setmainimage(product.photo3);
                }}
              />
            ) : null}
          </div>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography variant="h6"> {product.name}</Typography>
          <Typography style={{ color: "#9c8627" }} variant="body1">
            Price : {product.price}
          </Typography>
          <Typography>Stock pieces: {product.quantity}</Typography>
          <Typography>Catagory: {product.catagory}</Typography>
          <Typography>Brand: {product.brand}</Typography>
          <Typography>Discount: {product.discount} %</Typography>
          {product.delivary_type ? (
            <Typography>Cash on delivary avaialabe</Typography>
          ) : (
            <Typography>Need to pay prior to delivary</Typography>
          )}

          <label>Qty</label>
          <select
            onChange={(e) => setQuantity(e.target.value)}
            name="pets"
            id="pet-select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <Button
            size="small"
            variant="contained"
            color="primary"
            style={{ margin: 2 }}
            onClick={() => {
              addtocart(product, quantity);
            }}
          >
            Add to cart
          </Button>

          <Typography>User Rating </Typography>
          {product.totalrating != undefined ? (
            <Rating data={product.totalrating} />
          ) : null}

          <Dialog
            open={loginrequestpop}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Login prior to adding cart"}
            </DialogTitle>

            <DialogActions>
              <Button color="primary" autoFocus>
                <a style={{ textDecoration: "none" }} href="accounts/login/">
                  {" "}
                  Login
                </a>
              </Button>
              <Button color="primary">
                <a style={{ textDecoration: "none" }} href="accounts/register/">
                  {" "}
                  Sign up
                </a>
              </Button>
              <Button onClick={handleClose} color="primary">
                close
              </Button>
            </DialogActions>
          </Dialog>

          <Typography>Description: {product.description}</Typography>
          <Button size="small" variant="outlined" color="secondary">
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: `/ProductReviews:${product.id}` }}
            >
              Buyers Reviews
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Productdetails;
