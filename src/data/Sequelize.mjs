import { Sequelize } from "sequelize";

var dbname = process.env.DBNAME
var dbuser = process.env.DBUSER
var dbpassword = process.env.DBPASSWORD
var dbport = process.env.DBPORT
var dbhost = process.env.DBHOST

const connection = new Sequelize(
    dbname,
    dbuser,
    dbpassword,
    {
        dbport,
        dialect: "mysql",
        dbhost,
    }
)

connection
    .authenticate()
    .then(() => console.log(`INFO - Database connected.`))
    .catch((err) => console.log("ERROR - Unable to connect to the database:", err))

export default connection