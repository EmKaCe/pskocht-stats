import { readFileSync } from "fs";
import express from "express";
import { addDish, getStats, intializeRedis, setDish } from "./dbConnector";
import { json } from "body-parser";

const config = JSON.parse(readFileSync("./config.json").toString());

const isDish = (toCheck: object): toCheck is dish => {
    if (Object.keys(toCheck).length == 3) {
        if ((toCheck as dish).name !== undefined && (toCheck as dish).url !== undefined && (toCheck as dish).score !== undefined) {
            const scoreKeyLength = Object.keys((toCheck as dish).score).length;
            if (scoreKeyLength == 5) {
                if ((toCheck as dish).score.brammen !== undefined && (toCheck as dish).score.chris !== undefined && (toCheck as dish).score.jay !== undefined && (toCheck as dish).score.piet !== undefined && (toCheck as dish).score.sep !== undefined) {
                    return true;
                }
            } else {
                if (scoreKeyLength == 6) {
                    if ((toCheck as dish).score.brammen !== undefined && (toCheck as dish).score.chris !== undefined && (toCheck as dish).score.jay !== undefined && (toCheck as dish).score.piet !== undefined && (toCheck as dish).score.sep !== undefined && (toCheck as dish).score.gast !== undefined) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

if (config.port && config.authSecret && config.dbHost && config.dbPort) {
    intializeRedis(config.dbHost, config.dbPort);
    const app = express();
    const jsonParser = json();

    app.use(express.static("./build"));

    app.get("/stats/auth", (req, res) => {
        if (req.headers.authorization === config.authSecret) {
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    });

    app.get("/stats", (req, res) => {
        getStats().then((dishes) => {
            res.contentType("application/json");
            res.status(200).send(dishes);
        });
    });

    app.post("/stats/addMultiple", jsonParser, async (req, res) => {
        if (req.headers.authorization === config.authSecret) {
            const dishes: Array<dish> = req.body;
            dishes.forEach((dish) => {
                if (!isDish(dish)) {
                    res.status(400).send();
                    return;
                }
            });
            for (let i = 0; i < dishes.length; i++) {
                try {
                    await addDish(dishes[i]);
                } catch (e) {
                    res.status(500).send();
                    return;
                }
            }
            res.status(201).send();
        } else {
            res.status(401).send();
        }
    });

    app.post("/stats/add", jsonParser, (req, res) => {
        if (req.headers.authorization === config.authSecret) {
            if (isDish(req.body)) {
                addDish(req.body).then(() => {
                    res.status(201).send();
                }).catch(() => {
                    res.status(500).send();
                });
            } else {
                res.status(400).send();
            }
        } else {
            res.status(401).send();
        }
    });

    app.post("/stats/:index/set", jsonParser, (req, res) => {
        if (req.headers.authorization === config.authSecret) {
            const index = Math.floor(parseInt(req.params.index));
            if (isNaN(index) && !isDish(req.body)) {
                res.status(400).send();
            } else {
                setDish(index, req.body).then(() => {
                    res.status(200).send();
                }).catch(() => {
                    res.status(500).send();
                });
            }
        } else {
            res.status(401).send();
        }
    });

    app.get("*", (req, res) => {
        res.sendFile("./build/index.html");
    });

    app.listen(config.port, () => {
        console.log("PSKocht-Stats-BE running at port " + config.port);
    });
}