'use strict';
var cxDecryptWalletCtrl = function($scope, $sce, walletService) {
	$scope.allWallets = [];
    $scope.selectedWallet = $scope.password = "";
	$scope.setAllWallets = function() {
		cxFuncs.getWalletsArr(function(wlts) {
			$scope.allWallets = wlts;
            $scope.updateBalance();
            $scope.ves_extIds = Promise.all(wlts.map(function(w,i) {
                return globalFuncs.VES_getExtId(w.priv).catch(function(){});
            }));
			$scope.$apply();
		});
	};
	$scope.updateBalance = function() {
		for (var i = 0; i < $scope.allWallets.length; i++) {
			$scope.setBalance($scope.allWallets[i].addr,i);
		}
	};
	$scope.setBalance = function(address,id) {
		ajaxReq.getBalance(address, function(data) {
			if (data.error) {
				$scope.allWallets[id].balance = data.msg;
			} else {
                $scope.allWallets[id].balance = etherUnits.toEther(data.data.balance, 'wei');
			}
		});
	};
	$scope.setAllWallets();
    $scope.getPrivFromAdd = function(){
        return $scope.allWallets[$scope.getIdxFromAdd()].priv;
    }
    $scope.getIdxFromAdd = function(){
        if ($scope.selectedWallet=="") throw globalFuncs.errorMsgs[5];
       for (var i = 0; i < $scope.allWallets.length; i++) {
            if( $scope.allWallets[i].addr==$scope.selectedWallet)
                return i;
        }
        throw globalFuncs.errorMsgs[14];
    }
    $scope.$watch('selectedWallet',function() {
        $scope.ves_exists = null;
        $scope.ves_status = 'loading';
        if (!$scope.ves_exist) $scope.ves_exist = [];
        if ($scope.ves_extIds) (function(sel,addr) {
            if (!$scope.ves_exist[sel]) $scope.ves_exist[sel] = globalFuncs.VES_exist($scope.ves_extIds,sel);
            $scope.ves_extIds.then(function(extIds) {
                $scope.ves_extId = extIds[sel];
            });
            $scope.ves_exist[sel].then(function(exists) {
                if (addr == $scope.selectedWallet) {
                    $scope.ves_exists = exists;
                    $scope.ves_status = null;
                    $scope.$apply();
                }
            }).catch(function(e) {
                if (addr == $scope.selectedWallet) {
                    $scope.ves_status = 'error';
                    $scope.ves_error_msg = e.message;
                    $scope.$apply();
                }
            });
        })($scope.getIdxFromAdd(),$scope.selectedWallet);
    });
    $scope.decryptWallet = function() {
        switch ($scope.ves_status) {
            case 'starting': case 'loading': if ($scope.ves_exists != null) return; break;
            case 'ok': if ($scope.ves_wallet) return $scope.ves_backupDone();
        }
        $scope.wallet = null;
        try {
            var priv = $scope.getPrivFromAdd();
            if (priv.length==132)
                $scope.ves_wallet = Wallet.fromMyEtherWalletKey(priv, $scope.password);
            else
                $scope.ves_wallet = Wallet.getWalletFromPrivKeyFile(priv, $scope.password);
            walletService.password = $scope.password;
            try {
                if ($scope.ves_exists || !$scope.ves_backup_chkbx) throw null;
                $scope.ves_status = 'starting';
                return libVES.instance().delegate().then(function(myVES) {
                    $scope.ves_status = 'loading';
                    $scope.$apply();
                    return myVES.putValue({"domain":myVES.domain,"externalId":$scope.ves_extId},$scope.password).then(function(vi) {
                        $scope.ves_status = 'ok';
                        $scope.$apply();
                        window.setTimeout(function() {
                            $scope.ves_backupDone();
                            $scope.$apply();
                        },2000);
                    });
                }).catch(function(error) {
                    $scope.ves = false;
                    $scope.ves_error_msg = error.message;
                    $scope.ves_status = 'error';
                    $scope.$apply();
                });
            } catch(e) {
                $scope.ves_backupDone();
            }
        } catch (e) {
            $scope.notifier.danger(globalFuncs.errorMsgs[6] + ":" + e);
        }
        if($scope.wallet!=null) $scope.notifier.info(globalFuncs.successMsgs[1]);
    };
    $scope.ves_backupDone = function() {
        $scope.wallet = $scope.ves_wallet;
        walletService.wallet = $scope.wallet;
    };
    $scope.ves_showHidePswd = function () {
        $scope.vespswdVisible = !$scope.vespswdVisible;
    };
    $scope.ves_showHideWarningMsg = function () {
        $scope.mewwrnVisible = !$scope.mewwrnpswdVisible;
    };
    $scope.ves_retrieve = function () {
        $scope.ves_status = 'starting';
        libVES.instance().delegate().then(function(myVES) {
            $scope.ves_status = 'loading';
            $scope.$apply();
            myVES.getValue({"domain":myVES.domain,"externalId":$scope.ves_extId}).then(function(value) {
                $scope.ves_status = 'ok';
                var fld = document.getElementsByClassName('ves_retrieve_dec')[0];
                fld.value = value;
                angular.element(fld).triggerHandler('input');
                $scope.$apply();
            }).catch(function(error) {
                $scope.ves_status = 'error_retrieve';
                $scope.$apply();
            })
        }).catch(function(error) {
            $scope.ves_status = 'error';
            $scope.ves_error_msg = error.message;
            $scope.$apply();
        })
    };
};
module.exports = cxDecryptWalletCtrl;