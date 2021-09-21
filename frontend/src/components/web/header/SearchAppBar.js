import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { Grid, Button } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
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
}));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "#000" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <Typography
            variant="h6"
            noWrap
            style={{ marginLeft: "1rem", marginTop: "0.5rem" }}
            href="/"
          >
            Grocery Store
          </Typography>
          <Grid item md={3} lg={3} xl={4} style={{ marginLeft: "auto" }}>
            <Grid container className="bk_cart_sd">
              <Grid item md={6} lg={6} xl={6} className="btn_login">
                {!localStorage.getItem("user") && <Link to={"/login"}>
                  <Button className="login" variant="outlined">
                    <span>Login</span>
                  </Button>
                </Link>}
              </Grid>
              
              <Grid item md={6} lg={6} xl={6} className="cart">
                <Link to="/carts">
                  <Button className="cart_item" variant="outlined">
                    <span className="item_count">
                      {props.props.cartProps.cart}
                    </span>
                    <i
                      className="fa fa-shopping-cart my-cart-icon"
                      aria-hidden="true"
                    />
                    <span>Cart</span>
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
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
          <Link to="/" onClick={handleDrawerClose}>
            <ListItem button key={"Home"}>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/kitchen" onClick={handleDrawerClose}>
            <ListItem button key={"Grocery & Staples"}>
              <ListItemText primary={"Grocery & Staples"} />
            </ListItem>
          </Link>
          <Link to="/care" onClick={handleDrawerClose}>
            <ListItem button key={"Personal Care"}>
              <ListItemText primary={"Personal Care"} />
            </ListItem>
          </Link>
          <Link to="/house-hold" onClick={handleDrawerClose}>
            <ListItem button key={"Household"}>
              <ListItemText primary={"Household"} />
            </ListItem>
          </Link>
          <Link to="/transactiondetails" onClick={handleDrawerClose}>
            <ListItem button key={"Transaction Details"}>
              <ListItemText primary={"Transaction Details"} />
            </ListItem>
          </Link>
          <Link to="/subscription" onClick={handleDrawerClose}>
            <ListItem button key={"Subscription Details"}>
              <ListItemText primary={"Subscription Details"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
