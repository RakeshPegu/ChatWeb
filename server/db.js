import mysql from 'mysql2/promise'
export const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"@rakesh7099",
    database:"mydb"

})