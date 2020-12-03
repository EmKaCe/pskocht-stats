import React from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { NightsStayOutlined, WbSunnyOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Navbar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        PS-Kocht Stats
                    </Typography>
                    <Tooltip
                        title={(props.currentTheme ? "Helles" : "Dunkeles") + " Design aktivieren"}
                        aria-label="theme toggle tooltip"
                        placement="left"
                    >
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="theme toggle"
                            onClick={() => { props.themeToggle(!props.currentTheme); }}
                        >
                            {props.currentTheme ? <WbSunnyOutlined /> : <NightsStayOutlined />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Navbar.propTypes = {
    currentTheme: PropTypes.bool,
    themeToggle: PropTypes.func
};

export default Navbar;