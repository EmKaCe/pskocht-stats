/* eslint-disable react/display-name */
import React from "react";
import axios from "axios";
import { Container, Grid, Link, makeStyles, Paper, Tooltip, Typography } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "5em"
    },
    container: {
        marginTop: "2em"
    },
    paper: {
        marginTop: theme.spacing(1)
    }
}));

const BasicStats = () => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true);
    const [totalRows, setTotalRows] = React.useState([]);

    const calcDishAverage = (scores) => {
        let average = 0;
        let divider = 0;
        if (!isNaN(scores.brammen)) {
            average += parseFloat(scores.brammen);
            divider++;
        }
        if (!isNaN(scores.chris)) {
            average += parseFloat(scores.chris);
            divider++;
        }
        if (!isNaN(scores.jay)) {
            average += parseFloat(scores.jay);
            divider++;
        }
        if (!isNaN(scores.piet)) {
            average += parseFloat(scores.piet);
            divider++;
        }
        if (!isNaN(scores.sep)) {
            average += parseFloat(scores.sep);
            divider++;
        }
        if (!isNaN(scores.chris)) {
            average += parseFloat(scores.chris);
            divider++;
        }
        if (!isNaN(scores.jay)) {
            average += parseFloat(scores.jay);
            divider++;
        }
        if (!isNaN(scores.piet)) {
            average += parseFloat(scores.piet);
            divider++;
        }
        if (!isNaN(scores.gast)) {
            average += parseFloat(scores.gast);
            divider++;
        }
        if (divider !== 0) return (average / divider).toFixed(2);
        return "-";
    };

    const renderScore = (rawScore) => {
        let score;
        if (!rawScore) score = "-"; else score = parseFloat(rawScore);
        return (
            <div>
                {isNaN(score) && (
                    <Typography variant="body2" color="textSecondary">
                        {rawScore || "-"}
                    </Typography>
                )}
                {score == 0 && (
                    <Typography variant="body2" color="error">
                        <strong>{score}</strong>
                    </Typography>
                )}
                {score > 0 && score <= 3 && (
                    <Typography variant="body2" style={{ color: "#eb8100" }}>
                        <strong>{score}</strong>
                    </Typography>
                )}
                {score > 3 && score <= 6 && (
                    <Typography variant="body2" style={{ color: "#ffc800" }}>
                        <strong>{score}</strong>
                    </Typography>
                )}
                {score > 6 && score <= 8 && (
                    <Typography variant="body2" style={{ color: "#ffc800" }}>
                        <strong>{score}</strong>
                    </Typography>
                )}
                {score > 8 && score < 10 && (
                    <Typography variant="body2" style={{ color: "#00b80c" }}>
                        <strong>{score}</strong>
                    </Typography>
                )}
                {score == 10 && (
                    <Typography variant="body2" style={{ color: "#04bd88" }}>
                        <strong>{score}</strong>
                    </Typography>
                )}
            </div>
        );
    };

    const sortComparator = (val1, val2) => {
        if (val1 && val2) {
            if (isNaN(val1) && isNaN(val2)) {
                return val2.localeCompare(val1);
            }
            if (isNaN(val1)) {
                return 1;
            }
            if (isNaN(val2)) {
                return -1;
            }
            return val1 > val2 ? -1 : (val1 < val2 ? 1 : 0);
        } else {
            if (val1) return -1;
            else if (val2) return 1; else return 0;
        }
    };

    const calcCookData = (cook, type) => {
        let cookKey;
        switch (cook) {
            case "Brammen":
                cookKey = "brammen";
                break;
            case "Chris":
                cookKey = "chris";
                break;
            case "Jay":
                cookKey = "jay";
                break;
            case "Peter":
                cookKey = "piet";
                break;
            case "Sep":
                cookKey = "sep";
                break;
        }
        if (type == "avg") {
            let total = 0;
            let divider = 0;
            totalRows.forEach((row) => {
                const current = row.score[cookKey];
                if (!isNaN(current)) {
                    total += parseFloat(current);
                    divider++;
                }
            });
            return (total / divider).toFixed(2);
        }
        if (type == "max") {
            let currentMax = 0;
            totalRows.forEach((row) => {
                if (!isNaN(row.score[cookKey])) {
                    const tmp = parseFloat(row.score[cookKey]);
                    if (tmp > currentMax) currentMax = tmp;
                }
            });
            return currentMax;
        }
        if (type == "min") {
            let currentMin = 11;
            totalRows.forEach((row) => {
                if (!isNaN(row.score[cookKey])) {
                    const tmp = parseFloat(row.score[cookKey]);
                    if (tmp < currentMin) currentMin = tmp;
                }
            });
            return currentMin;
        }
        return "-";
    };

    const totalColumns = [
        {
            field: "name",
            headerName: "Gericht",
            width: 250,
            sortable: true,
            valueGetter: (params) => params.row.name,
            renderCell: (params) => (
                <Tooltip title="Zum Video!" placement="right" arrow>
                    <Typography variant="body2">
                        <Link href={params.row.url} rel="noreferrer" target="_blank" color="inherit">
                            {params.row.name}
                        </Link>
                    </Typography>
                </Tooltip>
            )

        },
        {
            field: "brammen",
            headerName: "Brammen",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.brammen,
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.brammen, cellParams2.row.score.brammen),
            renderCell: (params) => renderScore(params.row.score.brammen)
        },
        {
            field: "chris",
            headerName: "Chris",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.chris,
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.chris, cellParams2.row.score.chris),
            renderCell: (params) => renderScore(params.row.score.chris)
        },
        {
            field: "jay",
            headerName: "Jay",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.jay,
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.jay, cellParams2.row.score.jay),
            renderCell: (params) => renderScore(params.row.score.jay)
        },
        {
            field: "piet",
            headerName: "Peter",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.piet,
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.piet, cellParams2.row.score.piet),
            renderCell: (params) => renderScore(params.row.score.piet)
        },
        {
            field: "sep",
            headerName: "Sep",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.sep,
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.sep, cellParams2.row.score.sep),
            renderCell: (params) => renderScore(params.row.score.sep)
        },
        {
            field: "gast",
            headerName: "Gast",
            width: 120,
            sortable: true,
            valueGetter: (params) => params.row.score.gast || "-",
            sortComparator: (v1, v2, cellParams1, cellParams2) => sortComparator(cellParams1.row.score.gast, cellParams2.row.score.gast),
            renderCell: (params) => renderScore(params.row.score.gast)
        },
        {
            field: "avg",
            headerName: "Ø",
            width: 120,
            sortable: true,
            valueGetter: (params) => calcDishAverage(params.row.score),
            renderCell: (params) => renderScore(calcDishAverage(params.row.score))
        }
    ];

    const singleColumns = [
        {
            field: "cook",
            headerName: "Koch",
            width: 250,
            sortable: true,
            valueGetter: (params) => params.row.cook
        },
        {
            field: "avg",
            headerName: "Ø",
            width: 130,
            sortable: true,
            valueGetter: (params) => calcCookData(params.row.cook, "avg")
        },
        {
            field: "max",
            headerName: "Höchste",
            width: 130,
            sortable: true,
            valueGetter: (params) => calcCookData(params.row.cook, "max")
        },
        {
            field: "min",
            headerName: "Niedrigste",
            width: 130,
            sortable: true,
            valueGetter: (params) => calcCookData(params.row.cook, "min")
        }
    ];

    const singleRows = [
        { id: 1, cook: "Brammen" },
        { id: 2, cook: "Chris" },
        { id: 3, cook: "Jay" },
        { id: 4, cook: "Peter" },
        { id: 5, cook: "Sep" }
    ];

    React.useEffect(() => {
        axios.get("/stats").then((result) => {
            setTotalRows(result.data.map((dish) => {
                return JSON.parse(dish);
            }));
            setLoading(false);
        });
    }, []);

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Container className={classes.container}>
                <Typography variant="h4">Gesamtwertung:</Typography>
                <Paper
                    className={classes.paper}
                    elevation={3}
                >
                    <div style={{ height: 700 }}>
                        <DataGrid
                            columns={totalColumns}
                            rows={totalRows}
                            onCellClick={(cellParams) => { cellParams.element.blur(); }}
                            autoPageSize={true}
                            loading={loading}
                        />
                    </div>
                </Paper>
            </Container>
            <Container className={classes.container}>
                <Typography variant="h4">Einzelwertung:</Typography>
                <Paper
                    className={classes.paper}
                    elevation={3}
                >
                    <div style={{ height: 380 }}>
                        <DataGrid
                            columns={singleColumns}
                            rows={singleRows}
                            onCellClick={(cellParams) => { cellParams.element.blur(); }}
                            autoPageSize={false}
                            loading={loading}
                            rowsPerPageOptions={[]}
                        />
                    </div>
                </Paper>
            </Container>
        </Grid>
    );
};

export default BasicStats;