const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello World!'))

const startApp = () => {
    app.listen(port, () => console.log(`Api listening on port ${port}!`));
}

startApp();
