const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const items = require('./routes/api/items')
const app = express()

//body parser Middlewear
app.use(bodyParser.json())

// DB Connection
const db = require('./config/Connection').mongoURI;
// Connect mongoDB
mongoose
    .connect(db)
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err))

// Use routes
app.use('/api/items', items);

//Serve static assets if we're in production
if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(__dirname, 'client', 'build', 'index.html')
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))