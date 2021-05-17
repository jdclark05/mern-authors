const mongoose = require('mongoose');
require("./server/config/mongoose.config");
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ProductRoutes = require('./server/routes/authors.routes')(app);

const server = app.listen(port, () => console.log(`You are now listening on port ${port}`));