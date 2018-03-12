'use strict';
var myWalletsCtrl = function ($scope, $sce, walletService) {
    $scope.editModal = new Modal(document.getElementById('editWallet'));
    $scope.viewModal = new Modal(document.getElementById('viewWalletDetails'));
    $scope.removeModal = new Modal(document.getElementById('removeWallet'));
    $scope.allWallets = [];
    $scope.allWatchOnly = [];
    $scope.nickNames = [];
    $scope.fiatVal = {
        usd: 0,
        eur: 0,
        btc: 0
    };
    $scope.viewWallet = {};
    $scope.ajaxReq = ajaxReq;
    $scope.setNickNames = function () {
        cxFuncs.getAllNickNames(function (nicks) {
            $scope.nickNames = nicks;
        });
    };
    $scope.setAllWallets = function () {
        cxFuncs.getWalletsArr(function (wlts) {
            $scope.allWallets = wlts;
            $scope.updateBalance('allWallets');
            $scope.setTokens('allWallets');
            $scope.ves_extIds = Promise.all(wlts.map(function(w,i) {
                return globalFuncs.VES_getExtId(w.priv).catch(function(){});
            }));
        });
        cxFuncs.getWatchOnlyArr(function (wlts) {
            $scope.allWatchOnly = wlts;
            $scope.updateBalance('allWatchOnly');
            $scope.setTokens('allWatchOnly');
        });
    };
    $scope.$watch('ajaxReq.key', function () {
        if ($scope.allWallets) {
            $scope.updateBalance('allWallets');
            $scope.setTokens('allWallets');
        }
        if ($scope.allWatchOnly) {
            $scope.updateBalance('allWatchOnly');
            $scope.setTokens('allWatchOnly');
        }
    });
    $scope.setTokens = function (varWal) {
        for (var j = 0; j < $scope[varWal].length; j++) {
            $scope.tokens = Token.popTokens;
            $scope[varWal][j].tokens = [];
            for (var i = 0; i < $scope.tokens.length; i++) {
                $scope[varWal][j].tokens.push(new Token($scope.tokens[i].address, $scope[varWal][j].addr, $scope.tokens[i].symbol, $scope.tokens[i].decimal));
                $scope[varWal][j].tokens[$scope[varWal][j].tokens.length - 1].setBalance();
            }
            var storedTokens = globalFuncs.localStorage.getItem("localTokens", null) != null ? JSON.parse(globalFuncs.localStorage.getItem("localTokens")) : [];
            for (var i = 0; i < storedTokens.length; i++) {
                $scope[varWal][j].tokens.push(new Token(storedTokens[i].contractAddress, $scope[varWal][j].addr, globalFuncs.stripTags(storedTokens[i].symbol), storedTokens[i].decimal));
                $scope[varWal][j].tokens[$scope[varWal][j].tokens.length - 1].setBalance();
            }
        }
    };
    $scope.updateBalance = function (varWal) {
        for (var i = 0; i < $scope[varWal].length; i++) {
            $scope.setBalance($scope[varWal][i].addr, i, varWal);
        }
    };
    $scope.setBalance = function (address, id, varWal) {
        ajaxReq.getBalance(address, function (data) {
            if (data.error) {
                $scope[varWal][id].balance = data.msg;
            } else {
                $scope[varWal][id].balance = etherUnits.toEther(data.data.balance, 'wei');
                $scope[varWal][id].balanceR = new BigNumber($scope[varWal][id].balance).toPrecision(5);
                $scope[varWal][id].usd = etherUnits.toFiat($scope[varWal][id].balance, 'ether', $scope.fiatVal.usd);
                $scope[varWal][id].eur = etherUnits.toFiat($scope[varWal][id].balance, 'ether', $scope.fiatVal.eur);
                $scope[varWal][id].btc = etherUnits.toFiat($scope[varWal][id].balance, 'ether', $scope.fiatVal.btc);

                $scope[varWal][id].balance = $scope.wallet.setBalance();
                $scope[varWal][id].balanceR = $scope.wallet.setTokens();
            }
        });
    };
    $scope.setViewWalletObj = function (val, type) {
        var vtype = 'allWallets';
        if (type == 'watchOnly') vtype = 'allWatchOnly';
        $scope.viewWallet = {
            nick: $scope[vtype][val].nick,
            addr: $scope[vtype][val].addr,
            id: val,
            type: type
        }
    };
    $scope.editMWallet = function (val, type) {
        $scope.setViewWalletObj(val, type);
        $scope.editModal.open();
    };
    $scope.editSave = function () {
        if ($scope.nickNames.indexOf($scope.viewWallet.nick) !== -1) {
            $scope.notifier.danger(globalFuncs.errorMsgs[13]);
        } else {
            cxFuncs.editNickName($scope.viewWallet.addr, $scope.viewWallet.nick, function () {
                if (chrome.runtime.lastError) $scope.notifier.danger(chrome.runtime.lastError.message);
                else {
                    $scope.setAllWallets();
                    $scope.setNickNames();
                    $scope.editModal.close();
                }
            });
        }
    };
    $scope.viewMWallet = function (val, type) {
        $scope.setViewWalletObj(val, type);
        $scope.viewModal.open();
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
                    if (sel == $scope.viewWallet.id) {
                        $scope.ves_exists = exists;
                        $scope.ves_status = null;
                        $scope.$apply();
                    }
                }).catch(function(e) {
                    if (sel == $scope.viewWallet.id) {
                        $scope.ves_status = 'error';
                        $scope.ves_error_msg = e.message;
                        $scope.$apply();
                    }
                });
            })($scope.viewWallet.id);
        } catch(e) {
            $scope.ves_error_msg = e;
        }
    };
    $scope.decryptWallet = function () {
        switch ($scope.ves_status) {
            case 'starting': case 'loading': if ($scope.ves_exists != null) return; break;
            case 'ok': if ($scope.ves_wallet) return $scope.ves_backupDone();
        }
        $scope.wallet = null;
        try {
            var priv = $scope.allWallets[$scope.viewWallet.id].priv;
            if (priv.length == 132)
                $scope.ves_wallet = Wallet.fromMyEtherWalletKey(priv, $scope.password);
            else
                $scope.ves_wallet = Wallet.getWalletFromPrivKeyFile(priv, $scope.password);
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
    };
    $scope.ves_backupDone = function() {
        $scope.wallet = $scope.ves_wallet;
        $scope.viewModal.close();
        $scope.setWalletInfo();
        $scope.password = "";
    };
    $scope.printQRCode = function () {
        globalFuncs.printPaperWallets(JSON.stringify([{
            address: $scope.wallet.getChecksumAddressString(),
            private: $scope.wallet.getPrivateKeyString()
        }]));
    };
    $scope.resetWallet = function () {
        $scope.wallet = null;
        walletService.wallet = null;
        walletService.password = '';
        $scope.blob = $scope.blobEnc = $scope.password = "";
    };
    $scope.setWalletInfo = function () {
        walletService.wallet = $scope.wallet;
        walletService.password = $scope.password;
    };
    $scope.deleteWalletMsg = function (val, type) {
        $scope.setViewWalletObj(val, type);
        $scope.removeModal.open();
    };
    $scope.deleteWallet = function () {
        cxFuncs.deleteAccount($scope.viewWallet.addr, function () {
            $scope.setAllWallets();
            $scope.setNickNames();
            $scope.removeModal.close();
        });
    };
    ajaxReq.getETHvalue(function (data) {
        $scope.fiatVal.usd = data.usd;
        $scope.fiatVal.eur = data.eur;
        $scope.fiatVal.btc = data.btc;
        $scope.setAllWallets();
    });
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
                var fld = document.getElementsByClassName('ves_retrieve_my')[0];
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
    $scope.setNickNames();
};
module.exports = myWalletsCtrl;
