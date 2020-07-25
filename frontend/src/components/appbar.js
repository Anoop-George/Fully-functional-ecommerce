import React, { useState, Suspense } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "./cart/cartIcon";
const HorizontalTabs = React.lazy(() => import("./horizontalTabs"));
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: "relative",
  },
  title: {
    flexGrow: 1,

    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "fixed",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  a: { textDecoration: "none" },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let loggedinstatus = useSelector((state) => state.userloginstatus.loggedin);
  const [searchdata, setSearchdata] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Electro world
          </Typography>
          <CartIcon />
          <div className={classes.search}>
            <div className={classes.searchIcon}></div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchdata}
              onChange={(e) => setSearchdata(e.target.value)}
            />
          </div>
          <Link to={{ pathname: `/Search:${searchdata}` }}>
            <Button
              size="small"
              style={{ marginRight: 19 }}
              variant="contained"
            >
              <SearchIcon style={{ color: "#827514" }} />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick={() => handleDrawerClose()}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <Link to="/" className={classes.a}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>

          {loggedinstatus ? (
            <div>
              {" "}
              <ListItem>
                <a href="accounts/profile" className={classes.a}>
                  <ListItemText primary="Profile" />
                </a>
              </ListItem>
              <ListItem>
                <a href="accounts/logout" className={classes.a}>
                  <ListItemText primary="Logout" />
                </a>
              </ListItem>
              <ListItem>
                <Link to="/Orders">
                  <ListItemText
                    onClick={() => setOpen(false)}
                    primary="Your orders"
                  />
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/CartDetails">
                  <ListItemText
                    onClick={() => setOpen(false)}
                    primary="Your Cart"
                  />
                </Link>
              </ListItem>
            </div>
          ) : (
            <div>
              <ListItem>
                <a href="accounts/register" className={classes.a}>
                  <ListItemText primary="Sign up" />
                </a>
              </ListItem>
              <ListItem>
                <a href="accounts/login" className={classes.a}>
                  <ListItemText primary="Log In" />
                </a>
              </ListItem>
            </div>
          )}

          <ListItem>
            <Link to="/About">
              <ListItemText onClick={() => setOpen(false)} primary="About Us" />
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Suspense fallback={<div>Loading...</div>}>
        <HorizontalTabs />
      </Suspense>
    </div>
  );
}
