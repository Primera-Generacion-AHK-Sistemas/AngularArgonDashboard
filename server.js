const express = require('express');

const app = express();

app.use(express.static('./dist/argon-dashboard-angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/argon-dashboard-angular/'}),
);

app.listen(process.env.PORT || 8080);
