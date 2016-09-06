var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var csv = require('csv-to-json');
var loading = require("./CSVLoading");
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("port", process.env.PORT || 3001);

loading.initializeModels(app);

app.listen(3000, function () {
  console.log("App started on port 3000");
});