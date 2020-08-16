const express = require('express');

const app = express();


const PORT = 5000;

app.listen(PORT, (err) =>
{
    console.log(`Listening on port ${PORT}...`);
});


app.get('/api/test', (req, res) => 
{
    res.json('Hello From NodeJS!!!');
});