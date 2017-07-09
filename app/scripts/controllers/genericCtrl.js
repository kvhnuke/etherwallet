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
    $scope.loadingMsg = {
      msg : 'WELCOME_msg'+randNumber ,
      website : window.location.href
    }
};
module.exports = genericCtrl;
