const {Pool} = require('pg')


const connection = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
})

connection.on("error", (err) => {
    console.error("Unexpected database pool error:", err);
});


module.exports = connection