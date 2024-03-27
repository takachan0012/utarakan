const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/', routes);
const host = 'localhost';
const port = 8000;

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})
