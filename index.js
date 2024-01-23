const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRoute } = require('./routes/user');
const { authRoute } = require('./routes/auth');

const database_url = "mongodb+srv://korraganeshganesh:manjula@cluster0.veczb7u.mongodb.net/user";

const app = express();

mongoose.connect(database_url, {})
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error(err, "Could not connect to the database");
    });

app.use(express.json());
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send("This Quiz App");
});

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
