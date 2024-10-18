const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());
//url encoded 
// app.use(express.urlencoded({ extended: true }));

app.use("/artifacts", require("./routes/artifacts"));
app.use("/address", require("./routes/address"));
app.use("/artifactStatus", require("./routes/artifactStatus"));
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});


app.get('/', function (req, res) {
    res.send('Hello World')
})
