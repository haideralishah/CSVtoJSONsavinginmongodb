var app = angular.module("csvToJsonApi", ['ui.router', "ngMaterial", 'angular-cloudinary']);
app
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('csvApi', {
                url: '/csvApi',
                controller: 'csvApiController',
                templateUrl: 'views/csvApi/csvApi.html'
            });
        $urlRouterProvider
            .otherwise('/csvApi');
    })

    .config(function (cloudinaryProvider) {
        cloudinaryProvider.config({
            upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
            cloud_name: 'dp1c21y1z', // required
            upload_preset: 'nznicjmt', // optional
        });
    });