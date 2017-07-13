'use strict';
var viewCtrl = function($scope, globalService, $sce) {
    $scope.globalService = globalService;
    $scope.notifier = uiFuncs.notifier;
    $scope.notifier.sce = $sce;
    $scope.notifier.scope = $scope;

    var localNode = JSON.parse(globalFuncs.localStorage.getItem('curNode'));
    var curNodeKey = (localNode && localNode.key) || 'eth_mew';
    $scope.curNode = nodes.nodeList[curNodeKey];
};
module.exports = viewCtrl;
