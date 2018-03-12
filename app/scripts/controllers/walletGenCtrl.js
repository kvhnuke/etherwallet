'use strict';
var walletGenCtrl = function($scope) {
    $scope.password = "";
    $scope.wallet = null;
    $scope.showWallet = false;
    $scope.blob = $scope.blobEnc = "";
    $scope.isDone = true;
    $scope.showPass = true;
    $scope.fileDownloaded = false;
    $scope.showPaperWallet = false;
    $scope.showGetAddress = false;
    $scope.genNewWallet = function() {
        if (!$scope.isStrongPass()) {
            $scope.notifier.danger(globalFuncs.errorMsgs[1]);
        } else if ($scope.isDone) {
            $scope.wallet = $scope.blob = $scope.blobEnc = null;
            if (!$scope.$$phase) $scope.$apply();
            $scope.isDone = false;
            $scope.wallet = Wallet.generate(false);
            $scope.showWallet = true;
            $scope.blob = globalFuncs.getBlob("text/json;charset=UTF-8", $scope.wallet.toJSON());
            var walletV3 = $scope.wallet.toV3($scope.password, {
                kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
            });
            $scope.blobEnc = globalFuncs.getBlob("text/json;charset=UTF-8", walletV3);
            $scope.encFileName = $scope.wallet.getV3Filename();
            globalFuncs.VES_getExtId(JSON.stringify(walletV3)).then(function(extId) {
                $scope.ves_extId = extId;
                if (parent != null)
                    parent.postMessage(JSON.stringify({ address: $scope.wallet.getAddressString(), checksumAddress: $scope.wallet.getChecksumAddressString() }), "*");
                $scope.isDone = true;
                if (!$scope.$$phase) $scope.$apply();
            });
        }
    }
    $scope.printQRCode = function() {
        globalFuncs.printPaperWallets(JSON.stringify([{
            address: $scope.wallet.getChecksumAddressString(),
            private: $scope.wallet.getPrivateKeyString()
        }]));
    }
    $scope.isStrongPass = function() {
        return globalFuncs.isStrongPass($scope.password);
    }
    $scope.downloaded = function() {
        $scope.fileDownloaded = true;
    }
    $scope.ves = false;
    $scope.ves_backup = function () {
        switch ($scope.ves_status) {
            case 'starting': case 'loading': return;
            case 'ok': $scope.ves = true; return;
        }
        $scope.ves_status = 'starting';
        libVES.instance().delegate().then(function(myVES) {
            $scope.ves_status = 'loading';
            $scope.$apply();
            return myVES.putValue({"domain":myVES.domain,"externalId":$scope.ves_extId},$scope.password).then(function(vi) {
                $scope.ves_status = 'ok';
                $scope.$apply();
                window.setTimeout(function() {
                    $scope.ves = true;
                    $scope.$apply();
                },2000);
            });
        }).catch(function(error) {
            $scope.ves = false;
            $scope.ves_error_msg = error.message;
            $scope.ves_status = 'error';
            $scope.$apply();
        });
    };
    $scope.ves_cancel = function() {
        $scope.ves = true;
    };
    $scope.continueToPaper = function() {
        $scope.showPaperWallet = true;
    };
    $scope.getAddress = function(){
        $scope.showPaperWallet = false;
        $scope.wallet = null;
        $scope.showGetAddress = true;
    };
};
module.exports = walletGenCtrl;
