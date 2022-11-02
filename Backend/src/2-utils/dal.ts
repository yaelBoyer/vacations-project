import mysql from "mysql";
import config from "./config";


// Creating a connection object:
const connection = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

console.log("We're connected to MySQL");





function executeAsync(sql:string, values?:any[]): Promise<any>{
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}


export default {
    executeAsync
};