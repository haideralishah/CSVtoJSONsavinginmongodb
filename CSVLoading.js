var Converter = require("csvtojson").Converter;
var converter = new Converter({ constructResult: false }); //for big csv data
var mongoose = require('mongoose');
//you need to change the database path 
var connection = mongoose.connect("mongodb://localhost/testCSV_API");
//you may alter the data schema
var CSVdataSchema = new mongoose.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    country: { type: String, required: true },
    population: { type: Number, required: true },
    label: { type: String, required: true }
});
var CSVToJSONDataModel = mongoose.model("CSVToJSONDataModel", CSVdataSchema);
function loading(app) {
    app.post("/saveCSVInJson", saveCSVInJson);
    function saveCSVInJson(req, res) {
        var fPath = req.body.data.url;
        saveDataToMongoDB(fPath, function (json) {
            res.end();
        });
    }
    function saveDataToMongoDB(filePath, cb) {
        require("request").get(filePath).pipe(converter);
        converter.on("record_parsed", function (jsonObj) {
            console.log(jsonObj); //here is your result json object
            var JSONedData = new CSVToJSONDataModel({
                y: jsonObj.y,
                x: jsonObj.x, 
                country: jsonObj.country,
                population: jsonObj.population,
                label: jsonObj.label
            });
            JSONedData.save(function (err, success) {
                if (err) {
                    console.log(err + "Error! Something went wrong.");
                }
                else {
                    console.log(success + "JSON converted data saved");
                }
            });

            });
        }
}
    exports.initializeModels = loading;
