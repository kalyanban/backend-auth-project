const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Error opening Database.", err.message)
    } else {
        console.log("Connected to SQLite Database.")

        db.run(`
          CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          )  
        `, (err) => {
            if (err) {
                console.error("Error creating table.", err.message)
            }
        })
    }
})
module.exports = db