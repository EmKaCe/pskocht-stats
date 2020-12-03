import React from "react";
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Navbar from "./Navbar";
import BasicStats from "./BasicStats";
import Contact from "./Contact";

const useStyles = makeStyles(() => ({
    navbar: {
        marginBottom: "5em"
    }
}));

const App = () => {
    const classes = useStyles();

    const [useDarkTheme, setUseDarkTheme] = React.useState(true);

    const lightTheme = createMuiTheme({
        palette: {
            common: {
                black: "#000",
                white: "#fff"
            },
            type: "light",
            primary: {
                main: green["800"]
            },
            secondary: {
                main: green["900"]
            },
            error: {
                light: "#e57373",
                main: "#f44336",
                dark: "#d32f2f",
                contrastText: "#fff"
            },
            warning: {
                light: "#ffb74d",
                main: "#ff9800",
                dark: "#f57c00",
                contrastText: "rgba(0, 0, 0, 0.87)"
            },
            info: {
                light: "#64b5f6",
                main: "#2196f3",
                dark: "#1976d2",
                contrastText: "#fff"
            },
            success: {
                light: "#81c784",
                main: "#4caf50",
                dark: "#388e3c",
                contrastText: "rgba(0, 0, 0, 0.87)"
            },
            grey: {
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                A100: "#d5d5d5",
                A200: "#aaaaaa",
                A400: "#303030",
                A700: "#616161"
            },
            contrastThreshold: 3,
            text: {
                primary: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)",
                hint: "rgba(0, 0, 0, 0.38)"
            },
            divider: "rgba(0, 0, 0, 0.12)",
            background: {
                paper: "#f0f0f0",
                default: "#efefef"
            },
            action: {
                active: "rgba(0, 0, 0, 0.54)",
                hover: "rgba(0, 0, 0, 0.04)",
                hoverOpacity: "0.04",
                selected: "rgba(0, 0, 0, 0.08)",
                selectedOpacity: "0.08",
                disabled: "rgba(0, 0, 0, 0.26)",
                disabledBackground: "rgba(0, 0, 0, 0.12)",
                disabledOpacity: "0.38",
                focus: "rgba(0, 0, 0, 0.12)",
                focusOpacity: "0.12",
                activatedOpacity: "0.12"
            }
        }
    });

    const darkTheme = createMuiTheme({
        palette: {
            common: {
                black: "#000",
                white: "#fff"
            },
            type: "dark",
            primary: {
                main: green["800"]
            },
            secondary: {
                main: green["900"]
            },
            error: {
                light: "#e57373",
                main: "#f44336",
                dark: "#d32f2f",
                contrastText: "#fff"
            },
            warning: {
                light: "#ffb74d",
                main: "#ff9800",
                dark: "#f57c00",
                contrastText: "rgba(0, 0, 0, 0.87)"
            },
            info: {
                light: "#64b5f6",
                main: "#2196f3",
                dark: "#1976d2",
                contrastText: "#fff"
            },
            success: {
                light: "#81c784",
                main: "#4caf50",
                dark: "#388e3c",
                contrastText: "rgba(0, 0, 0, 0.87)"
            },
            grey: {
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                A100: "#d5d5d5",
                A200: "#aaaaaa",
                A400: "#303030",
                A700: "#616161"
            },
            text: {
                primary: "#fff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
                hint: "rgba(255, 255, 255, 0.5)",
                icon: "rgba(255, 255, 255, 0.5)"
            },
            divider: "rgba(255, 255, 255, 0.12)",
            background: {
                paper: "#424242",
                default: "#303030"
            },
            action: {
                active: "#fff",
                hover: "rgba(255, 255, 255, 0.08)",
                hoverOpacity: 0.08,
                selected: "rgba(255, 255, 255, 0.16)",
                selectedOpacity: 0.16,
                disabled: "rgba(255, 255, 255, 0.3)",
                disabledBackground: "rgba(255, 255, 255, 0.12)",
                disabledOpacity: 0.38,
                focus: "rgba(255, 255, 255, 0.12)",
                focusOpacity: 0.12,
                activatedOpacity: 0.24
            }
        }
    });

    return (
        <div>
            <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
                <CssBaseline />
                <header className={classes.navbar}>
                    <Navbar
                        currentTheme={useDarkTheme}
                        themeToggle={setUseDarkTheme}
                    />
                </header>
                <main>
                    <BasicStats />
                    <Contact />
                </main>
            </ThemeProvider>
        </div>
    );
};

export default App;
