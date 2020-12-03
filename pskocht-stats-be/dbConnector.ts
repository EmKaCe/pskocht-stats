import { createClient, RedisClient } from "redis";

let client: RedisClient;

export const intializeRedis = (host, port) => {
    client = createClient({ host: host, port: port });
};

export const getStats = async (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        client.lrange("dishes", 0, -1, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

export const addDish = async (dish: dish) => {
    return new Promise((resolve, reject) => {
        client.llen("dishes", (err, lenres) => {
            if (err) {
                reject(err);
            } else {
                dish.id = 99999 - lenres;
                client.lpush("dishes", JSON.stringify(dish), (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            }
        });
    });
};

export const setDish = async (index: number, dish: dish) => {
    return new Promise((resolve, reject) => {
        client.lset("dishes", index, JSON.stringify(dish), (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};