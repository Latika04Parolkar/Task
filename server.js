const express = require('express');
const signup = require("./routes/signup");
const login = require("./routes/login");
const storeInfo = require("./routes/storeInfo");
const getEmployeeInfo = require("./routes/getInfo");

require('./config/db');
const app = express();
app.use(express.json());

app.use(signup);
app.use(login);
app.use(storeInfo);
app.use(getEmployeeInfo);

app.listen(5000, () => console.log('listening on : 5000'));

// C:\Program Files\MongoDB\Server\5.0\bin
// Svvv2023@superuser