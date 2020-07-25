import React from "react";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Cart() {
  const items = useSelector((state) => state.cart.items);
  return (
    <div style={{ position: "fixed", right: 4}}>
      <Link to="/CartDetails">
        <IconButton aria-label="cart" size="medium">
          <StyledBadge badgeContent={items.length} color="secondary">
            <ShoppingCartIcon style={{ color: "yellow" }} />
          </StyledBadge>
        </IconButton>
      </Link>
    </div>
  );
}

export default Cart;
