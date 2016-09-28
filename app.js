var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var loading = require("./CSVLoading");
var cors = require('cors');
var app = express();
var publicPath = path.resolve(__dirname + "/Web");

app.use("/", express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.set("port", process.env.PORT || 3002);

loading.initializeModels(app);

app.listen(3002, function () {
  console.log("App started on port 3002");
});