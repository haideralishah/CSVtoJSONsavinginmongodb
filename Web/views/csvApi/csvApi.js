angular.module('csvToJsonApi')
    .controller('csvApiController', function ($scope, $http, cloudinary) {
        $scope.file_changed = function (element) {
            $scope.$apply(function (scope) {
                $scope.photofile = element.files[0];
            });
        };
        $scope.upload = function () {
            console.log("uploadFunction");
            cloudinary.upload($scope.photofile, { /* cloudinary options here */ })
                .then(function (resp) {
                    console.log(resp.data);
                    console.log(resp.data.url);
                    $http.post("/saveCSVInJson", resp)
                        .then(function (success) {
                            console.log(success);
                        }, function (err) {
                            console.log(err);
                        })
                }, function(err){
                    console.log(err);
                });
        }
    });
