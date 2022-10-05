import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mro234ord!",
  database: "blog",
  port: "/var/run/mysqld/mysqld.sock",
});
