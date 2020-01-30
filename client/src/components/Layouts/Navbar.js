import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { css } from "@emotion/core";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  Hidden,
  ListItemText,
  Divider
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginBottom: "2em"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function Navbar(props) {
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const currentPage = () => {
    const { pathname } = props.location;
    if (pathname.length > 1) {
      return pathname
        .split("/")
        .slice(1)
        .join("");
    }
    return "Home";
  };
  const handleDrawerToggle = () => {
    if (window && window.innerWidth < 600) {
      setOpen(!isOpen);
    }
  };

  const drawer = (
    <div
      className={classes.toolbar}
      css={css`
        a {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.87);
          &.current {
            color: #1976d2;
          }
        }
      `}
    >
      <Divider />
      <List style={{ width: "240px" }}>
        <NavLink to="/">
          <ListItem onClick={handleDrawerToggle}>
            <Typography variant="h5">Client Manager</Typography>
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/clients" activeClassName="current">
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Clients" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/reviews" activeClassName="current">
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Reviews" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/about" activeClassName="current">
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="About" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/login" activeClassName="current">
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Login" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <ArrowForward color="inherit" />
          </IconButton>
          <Typography
            variant="h6"
            css={css`
              text-transform: capitalize;
            `}
          >
            {currentPage()}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            open={isOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            className={classes.drawer}
            onClose={handleDrawerToggle}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
