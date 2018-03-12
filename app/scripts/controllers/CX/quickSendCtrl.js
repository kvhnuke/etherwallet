'use strict';
var quickSendCtrl = function($scope, $sce) {
	$scope.allWallets = [];
	$scope.selectedWallet = "";
	$scope.showConfirm = false;
	$scope.tx = {
		gasLimit: globalFuncs.defaultTxGasLimit,
		data: "",
		to: "",
		unit: "ether",
		value: "",
		nonce: null,
		gasPrice: null,
		donate: false
	}
	$scope.setAllWallets = function() {
		cxFuncs.getWalletsArr(function(wlts) {
			$scope.allWallets = wlts;
			$scope.updateBalance('allWallets');
                    $scope.ves_extIds = Promise.all(wlts.map(function(w,i) {
                        return globalFuncs.VES_getExtId(w.priv).catch(function(){});
                    }));
		});
	};
	$scope.updateBalance = function(varWal) {
		for (var i = 0; i < $scope[varWal].length; i++) {
			$scope.setBalance($scope[varWal][i].addr, i, varWal);
		}
	};
	$scope.setBalance = function(address, id, varWal) {
		ajaxReq.getBalance(address, function(data) {
			if (data.error) {
				$scope[varWal][id].balance = data.msg;
			} else {
				$scope[varWal][id].balance = etherUnits.toEther(data.data.balance, 'wei');
				$scope[varWal][id].balanceR = new BigNumber($scope[varWal][id].balance).toPrecision(5);
			}
		});
	};
	$scope.validateAddress = function() {
		if (ethFuncs.validateEtherAddress($scope.tx.to)) {
			$scope.validateAddressStatus = $sce.trustAsHtml(globalFuncs.getSuccessText(globalFuncs.successMsgs[0]));
		} else {
			$scope.validateAddressStatus = $sce.trustAsHtml(globalFuncs.getDangerText(globalFuncs.errorMsgs[5]));
		}
	}
	$scope.transferAllBalance = function() {
		$scope.wallet = {};
		$scope.wallet.getAddressString = function() {
			return $scope.allWallets[$scope.selectedWallet].addr;
		}
        uiFuncs.transferAllBalance($scope.wallet.getAddressString(), $scope.tx.gasLimit, function(resp) {
			if (!resp.isError) {
				$scope.tx.unit = resp.unit;
				$scope.tx.value = resp.value;
			} else {
				$scope.validateTxStatus = $sce.trustAsHtml(resp.error);
			}
		});
	}
	$scope.prepTX = function() {
		try {
			if (!ethFuncs.validateEtherAddress($scope.tx.to)) throw globalFuncs.errorMsgs[5];
			else if (!globalFuncs.isNumeric($scope.tx.value) || parseFloat($scope.tx.value) < 0) throw globalFuncs.errorMsgs[0];
			$scope.showConfirm = true;
		} catch (e) {
			$scope.prepTXStatus = $sce.trustAsHtml(globalFuncs.getDangerText(e));
		}
	}
	$scope.unlockAndSend = function() {
            switch ($scope.ves_status) {
                case 'starting': case 'loading': if ($scope.ves_exists != null) return; break;
                case 'ok': if ($scope.wallet) return $scope.ves_backupDone();
            }
            try {
                $scope.decryptWallet();
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
                $scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText(e));
            }
        };
        $scope.ves_backupDone = function() {
		try {
			var txData = uiFuncs.getTxData($scope);
			uiFuncs.generateTx(txData, function(rawTx) {
				if (!rawTx.isError) {
					uiFuncs.sendTx(rawTx.signedTx, function(resp) {
						if (!resp.isError) {
							$scope.sendTxStatus = $sce.trustAsHtml(globalFuncs.getSuccessText(globalFuncs.successMsgs[2] + "<br />" + resp.data + "<br /><a href='http://etherscan.io/tx/" + resp.data + "' target='_blank' rel='noopener'> ETH TX via EtherScan.io </a>"));
							$scope.setBalance();
						} else {
							$scope.sendTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText(resp.error));
						}
					});
					$scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText(''));
				} else {
					$scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText(rawTx.error));
				}
			});
		} catch (e) {
			$scope.validateTxStatus = $sce.trustAsHtml(globalFuncs.getDangerText(e));
		}
	}
        $scope.$watch('selectedWallet',function() {
            try {
                $scope.ves_exists = null;
                $scope.ves_status = 'loading';
                if (!$scope.ves_exist) $scope.ves_exist = [];
                if ($scope.ves_extIds) (function(sel) {
                    if (!$scope.ves_exist[sel]) $scope.ves_exist[sel] = globalFuncs.VES_exist($scope.ves_extIds,sel);
                    $scope.ves_extIds.then(function(extIds) {
                        $scope.ves_extId = extIds[sel];
                    });
                    $scope.ves_exist[sel].then(function(exists) {
                        if (sel == $scope.selectedWallet) {
                            $scope.ves_exists = exists;
                            $scope.ves_status = null;
                            $scope.$apply();
                        }
                    }).catch(function(e) {
                        if (sel == $scope.selectedWallet) {
                            $scope.ves_status = 'error';
                            $scope.ves_error_msg = e.message;
                            $scope.$apply();
                        }
                    });
                })($scope.selectedWallet);
            } catch(e) {
                $scope.ves_error_msg = e;
            }
        });
        $scope.decryptWallet = function() {
            $scope.wallet = null;
            $scope.validateTxStatus = "";
            $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.allWallets[$scope.selectedWallet].priv, $scope.password);
        };
    $scope.ves_showHidePswd = function () {
        $scope.vespswdVisible = !$scope.vespswdVisible;
    };
    $scope.ves_retrieve = function () {
        $scope.ves_status = 'starting';
        libVES.instance().delegate().then(function(myVES) {
            $scope.ves_status = 'loading';
            $scope.$apply();
            myVES.getValue({"domain":myVES.domain,"externalId":$scope.ves_extId}).then(function(value) {
                $scope.ves_status = 'ok';
                var fld = document.getElementsByClassName('ves_retrieve')[0];
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
  $scope.selectedWallet = "";
  $scope.password = "";
  $scope.$parent.selectedWallet ="";
  $scope.tx.to = "";
  $scope.tx.value = "";

	$scope.setAllWallets();
};
module.exports = quickSendCtrl;
