const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json()); // Middleware(a software in the middle, that bridges two things)

app.use(cors()); // CORS Middleware

// Available Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`iNotebook app listening on  http://localhost:${port}`);
})