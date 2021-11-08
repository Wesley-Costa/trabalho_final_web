const express = require('express')
const routes = require('./rotas')
const cors = require('cors');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    next();
})
app.use(cors());
app.use(routes);
app.listen(3001);