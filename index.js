import express from 'express'
const app = express()



// import mysql from 'mysql2';

// // Create the connection to database
// const connection = await mysql.createConnection({
//   host: '3380-project.mysql.database.azure.com',
//   port: '3306',
//   user: 'database',
//   password: 'DB3380@UH',
//   database: 'museum',
//   ssl: {
//     rejectUnauthorized: true, // Set to true for production
// }
// });

// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err.stack);
//       return;
//     }
//     console.log('Connected to the MySQL server as ID:', connection.threadId);
//   });



app.listen(3001)


app.get('/', function (req, res) {
  res.send('Hello World')
})



app.get('/tablename', function (req, res) {
    const query = 'SELECT * FROM museum.address'; // Replace 'tablename' with your actual table name

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'An error occurred while fetching data' });
      }
      // Send results as JSON
      res.json(results);
    });
});

app.post('/customer', function (req, res) {
    const query = 'INSERT INTO CUs'; // Replace 'tablename' with your actual table name

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return res.status(500).json({ error: 'An error occurred while fetching data' });
      }
      // Send results as JSON
      res.json(results);
    });
});