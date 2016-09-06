var csv = require('csv-to-json');
var mongoose = require('mongoose');

//you need to change the database path 
var connection = mongoose.connect("mongodb://localhost/test");

//you may alter the data schema
var CSVdataSchema = new mongoose.Schema({
    data: { type: JSON, required: true }
});

var CSVToJSONDataModel = mongoose.model("CSVToJSONDataModel", CSVdataSchema);
function loading(app) {
    app.post("/saveCSVInJson", saveCSVInJson);
    function saveCSVInJson(req, res) {
        //console.log(req.body);
        saveDataToMongoDB("./cities.csv", function (json) {
            res.end();
        });
    }
    function saveDataToMongoDB(filePath, cb) {
        var obj = {
            filename: filePath
        };
        var callback = function (err, json) {
            var JSONedData = new CSVToJSONDataModel({
                data: json
            });
            JSONedData.save(function (err, success) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(success + "JSON converted data saved");
                }
            });
            cb(json);
        };
        csv.parse(obj, callback);
    }
}
exports.initializeModels = loading;
