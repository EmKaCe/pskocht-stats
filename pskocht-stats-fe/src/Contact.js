import React from "react";
import { Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { EmojiFoodBeverageRounded, GitHub, Instagram, Mail } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    container: {
        padding: theme.spacing(5)
    },
    iconGroup: {
        padding: theme.spacing(2)
    }
}));

const Contact = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                className={classes.container}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h5">
                    Made with <EmojiFoodBeverageRounded /> by Emre Cetin
                </Typography>
                <Grid
                    className={classes.iconGroup}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Tooltip placement="bottom" title="GitHub">
                        <IconButton href="https://github.com/EmKaCe" rel="noreferrer" target="_blank">
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="bottom" title="E-Mail">
                        <IconButton href="mailto:emkace@protonmail.com">
                            <Mail />
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Instagram">
                        <IconButton href="https://www.instagram.com/em.pathielos/" rel="noreferrer" target="_blank">
                            <Instagram />
                        </IconButton>
                    </Tooltip>
                </Grid>
                {/*
                <Typography align="center">
                    Du magst verschlüsselte Kommunikation?
                    <br />
                    <Link color="inherit" href="https://emkace.de/files/emkace_protonmail.com.gpg">
                        Hier kannst du meinen PGP-Schlüssel herunterladen!
                    </Link>
                </Typography>
                */}
            </Grid>
        </div>
    );
};

export default Contact;