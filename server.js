const express = require('express');
const mongoose = require('mongoose');
const app = express()

//body parser Middlewear
app.use(express.json())

// DB Connection
const db = require('./config/Connection').mongoURI;
// Connect mongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err))

// Use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

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