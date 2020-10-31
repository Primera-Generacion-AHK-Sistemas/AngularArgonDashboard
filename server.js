const express = require('express');
const compression = require('compression')

const app = express();

// compress all responses
app.use(compression());

// add all routes
app.use(express.static('./dist/'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/'}),
);

app.listen(process.env.PORT || 8080);
