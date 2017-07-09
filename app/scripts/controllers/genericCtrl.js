'use strict';
var genericCtrl = function($scope, globalService, $sce) {
    $scope.globalService = globalService;
    $scope.notifier = uiFuncs.notifier;
    $scope.notifier.sce = $sce;
    $scope.notifier.scope = $scope;

    $scope.showLoading = true;

   setTimeout(function ()
   {
     $scope.$apply(function()
     {
       $scope.showLoading = false;
     });
   }, 5000);

    var randNumber = Math.floor(Math.random() * 5) + 1;
    console.log( randNumber);
    if(randNumber == 1){$scope.loadingMsg = {msg : 'WELCOME_msg1' , website : window.location.href}}
    else if(randNumber == 2){$scope.loadingMsg = {msg : 'WELCOME_msg2' , website : window.location.href}}
    else if(randNumber == 3){$scope.loadingMsg = {msg : 'WELCOME_msg3' , website : window.location.href}}
    else if(randNumber == 4){$scope.loadingMsg = {msg : 'WELCOME_msg4' , website : window.location.href }}
    else   {$scope.loadingMsg = {msg : 'WELCOME_msg5', website : window.location.href }}

};
module.exports = genericCtrl;
