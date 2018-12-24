const port = 3001;

const app = require('express')();
const consign = require('consign');
const db = require('./src/config/db');

app.db = db;

consign()
    .then('./src/config/middlewares.js')
    .then('./src/api/validator.js')
    .then('./src/api')
    .then('./src/config/routes.js')
    .into(app);

app.listen(port, () => {
    console.log(`Conected to port ${port}`);
});

