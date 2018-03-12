'use strict';
var addWalletCtrl = function($scope, $sce) {
    $scope.showBtnGen = $scope.showBtnUnlock = $scope.showBtnAdd = $scope.showBtnAddWallet = $scope.showAddWallet = $scope.requireFPass = $scope.requirePPass = $scope.showPassTxt = false;
    $scope.nickNames = [];
    $scope.filePassword = $scope.fileContent = "";
    $scope.wallet = null;
    $scope.addAccount = {
        address: "",
        nickName: "",
        encStr: "",
        password: ""
    };
    $scope.ajaxReq = ajaxReq;
    $scope.nodeType = $scope.ajaxReq.type;
    $scope.HDWallet = {
        numWallets: 0,
        walletsPerDialog: 5,
        wallets: [],
        id: 0,
        hdk: null,
        dPath: '',
        defaultDPath: "m/44'/60'/0'/0", // first address: m/44'/60'/0'/0/0
        alternativeDPath: "m/44'/60'/0'", // first address: m/44'/60'/0/0
        customDPath: "m/44'/60'/1'/0", // first address: m/44'/60'/1'/0/0
        ledgerPath: "m/44'/60'/0'", // first address: m/44'/60'/0/0
        ledgerClassicPath: "m/44'/60'/160720'/0'", // first address: m/44'/60'/160720'/0/0
        trezorTestnetPath: "m/44'/1'/0'/0", // first address: m/44'/1'/0'/0/0
        trezorClassicPath: "m/44'/61'/0'/0", // first address: m/44'/61'/0'/0/0
        trezorPath: "m/44'/60'/0'/0", // first address: m/44'/60'/0'/0/0
    };
    $scope.HDWallet.dPath = $scope.HDWallet.defaultDPath;
    $scope.mnemonicModel = new Modal(document.getElementById('mnemonicModel'));
    $scope.$watch('ajaxReq.type', function() {
        $scope.nodeType = $scope.ajaxReq.type;
    });
    $scope.$watch('walletType', function() {
        if ($scope.walletType == "ledger") {
            switch ($scope.nodeType) {
                case nodes.nodeTypes.ETH:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerPath;
                    break;
                case nodes.nodeTypes.ETC:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerClassicPath;
                    break;
                case nodes.nodeTypes.MUS:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerMusicPath;
                    break;
                default:
                    $scope.HDWallet.dPath = $scope.HDWallet.ledgerPath;
            }
        } else if ($scope.walletType == "trezor") {
            switch ($scope.nodeType) {
                case nodes.nodeTypes.ETH:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorPath;
                    break;
                case nodes.nodeTypes.ETC:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorClassicPath;
                    break;
                case nodes.nodeTypes.MUS:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorMusicPath;
                    break;
                case nodes.nodeTypes.Ropsten:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorTestnetPath;
                    break;
                default:
                    $scope.HDWallet.dPath = $scope.HDWallet.trezorPath;
            }
        } else {
            $scope.HDWallet.dPath = $scope.HDWallet.defaultDPath;
        }
        $scope.ves_exists = $scope.walletType == "fileupload" ? null : false;
        $scope.ves_status = null;
        $scope.ves_extId = null;
        $scope.wallet = null;
    });
    $scope.onHDDPathChange = function(password = $scope.mnemonicPassword) {
        $scope.HDWallet.numWallets = 0;
        if ($scope.walletType == 'pastemnemonic') {
            $scope.HDWallet.hdk = hd.HDKey.fromMasterSeed(hd.bip39.mnemonicToSeed($scope.manualmnemonic.trim(), password));
            $scope.setHDAddresses($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
        } else if ($scope.walletType == 'ledger') {
            $scope.scanLedger();
        } else if ($scope.walletType == 'trezor') {
            $scope.scanTrezor();
        }
    }
    $scope.onCustomHDDPathChange = function() {
        $scope.HDWallet.dPath = $scope.HDWallet.customDPath;
        $scope.onHDDPathChange();
    }
    $scope.onPrivKeyChange = function() {
        $scope.addWalletStats = "";
        $scope.requirePPass = $scope.manualprivkey.length == 128 || $scope.manualprivkey.length == 132;
        $scope.showBtnUnlock = $scope.manualprivkey.length == 64;
    };
    $scope.onPrivKeyPassChange = function() {
        $scope.showBtnUnlock = $scope.privPassword.length > 6;
    };
    $scope.onMnemonicChange = function() {
        $scope.addWalletStats = "";
        $scope.showBtnUnlock = $scope.showDPaths = hd.bip39.validateMnemonic($scope.manualmnemonic);
    };
    $scope.showContent = function($fileContent) {
        $scope.notifier.info(globalFuncs.successMsgs[4] + document.getElementById('fselector').files[0].name);
        try {
            $scope.requireFPass = Wallet.walletRequirePass($fileContent);
            $scope.showBtnUnlock = !$scope.requireFPass;
            $scope.fileContent = $fileContent;
            try {
                $scope.ves_exists = null;
                globalFuncs.VES_getExtId(JSON.stringify(JSON.parse($fileContent))).then(function(extId) {
                    $scope.ves_extId = extId;
                    var myVES = libVES.instance();
                    $scope.ves_status = 'loading';
                    $scope.$apply();
                    myVES.getFileItem({domain:myVES.domain,externalId:extId}).then(function(vaultItem) {
                        return vaultItem.getId().then(function(id) {
                            $scope.ves_exists = true;
                            $scope.ves_status = null;
                            $scope.$apply();
                        }).catch(function(e) {
                            if (e.code == 'NotFound') {
                                $scope.ves_exists = false;
                                $scope.ves_status = null;
                                $scope.$apply();
                            } else throw e;
                        });
                    }).catch(function(e) {
                        $scope.ves_status = 'error';
                        $scope.ves_error_msg = e.message;
                        $scope.$apply();
                    });
                });
            } catch(e) {
                $scope.ves_error_msg = e;
            }
        } catch (e) {
            $scope.notifier.danger(e);
        }
    };
    $scope.openFileDialog = function($fileContent) {
        $scope.addWalletStats = "";
        document.getElementById('fselector').click();
    };
    $scope.onFilePassChange = function() {
        $scope.showBtnUnlock = $scope.filePassword.length >= 0;
    };
    $scope.setHDAddresses = function(start, limit) {
        $scope.HDWallet.wallets = [];
        for (var i = start; i < start + limit; i++) {
            $scope.HDWallet.wallets.push(new Wallet($scope.HDWallet.hdk.derive($scope.HDWallet.dPath + "/" + i)._privateKey));
            $scope.HDWallet.wallets[$scope.HDWallet.wallets.length - 1].setBalance(false);
        }
        $scope.HDWallet.id = 0;
        $scope.HDWallet.numWallets = start + limit;
    }
    $scope.AddRemoveHDAddresses = function(isAdd) {
        if (isAdd) $scope.setHDAddresses($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
        else $scope.setHDAddresses($scope.HDWallet.numWallets - 2 * $scope.HDWallet.walletsPerDialog, $scope.HDWallet.walletsPerDialog);
    }
    $scope.setHDWallet = function() {
        $scope.wallet = $scope.HDWallet.wallets[$scope.HDWallet.id];
        $scope.mnemonicModel.close();
        $scope.addAccount.address = $scope.wallet.getAddressString();
        $scope.notifier.info(globalFuncs.successMsgs[1]);
        $scope.showAddWallet = true;
        $scope.showPassTxt = $scope.addAccount.password == '';
        $scope.setBalance();
    }
    $scope.decryptWallet = function() {
        $scope.wallet = null;
        $scope.addWalletStats = "";
        try {
            if ($scope.walletType == "pasteprivkey" && $scope.requirePPass) {
                $scope.wallet = Wallet.fromMyEtherWalletKey($scope.manualprivkey, $scope.privPassword);
                $scope.addAccount.password = $scope.privPassword;
            } else if ($scope.walletType == "pasteprivkey" && !$scope.requirePPass) {
                $scope.wallet = new Wallet($scope.manualprivkey);
                $scope.addAccount.password = '';
            } else if ($scope.walletType == "fileupload") {
                $scope.wallet = Wallet.getWalletFromPrivKeyFile($scope.fileContent, $scope.filePassword);
                $scope.addAccount.password = $scope.filePassword;
            } else if ($scope.walletType == "pastemnemonic") {
                $scope.mnemonicModel.open();
                $scope.HDWallet.hdk = hd.HDKey.fromMasterSeed(hd.bip39.mnemonicToSeed($scope.manualmnemonic.trim()));
                $scope.HDWallet.numWallets = 0;
                $scope.setHDAddresses($scope.HDWallet.numWallets, $scope.HDWallet.walletsPerDialog);
            }
        } catch (e) {
            $scope.notifier.danger(globalFuncs.errorMsgs[6] + e);
        }
        if ($scope.wallet != null) {
            $scope.addAccount.address = $scope.wallet.getAddressString();
            $scope.showAddWallet = true;
            $scope.notifier.info(globalFuncs.successMsgs[1]);
            $scope.showPassTxt = $scope.addAccount.password == '';
            $scope.addAccount.encStr = $scope.addAccount.password == '' ? null : $scope.fileContent;
            $scope.setBalance();
        }
    };
    $scope.setNickNames = function() {
        cxFuncs.getAllNickNames(function(nicks) {
            $scope.nickNames = nicks;
        });
    };
    $scope.setNickNames();
    $scope.newWalletChange = function(varStatus, shwbtn) {
        if ($scope.addAccount.nickName != "" && $scope.nickNames.indexOf($scope.addAccount.nickName) == -1 && $scope.addAccount.password.length > 8) $scope[shwbtn] = true;
        else $scope[shwbtn] = false;
        if ($scope.nickNames.indexOf($scope.addAccount.nickName) !== -1) $scope.notifier.danger(globalFuncs.errorMsgs[13]);

    }
    $scope.watchOnlyChange = function() {
        if ($scope.addAccount.address != "" && $scope.addAccount.nickName != "" && $scope.nickNames.indexOf($scope.addAccount.nickName) == -1 && ethFuncs.validateEtherAddress($scope.addAccount.address)) $scope.showBtnAdd = true;
        else $scope.showBtnAdd = false;
        if ($scope.addAccount.address != "" && !ethFuncs.validateEtherAddress($scope.addAccount.address)) $scope.notifier.danger(globalFuncs.errorMsgs[5]);
        else if ($scope.nickNames.indexOf($scope.addAccount.nickName) !== -1) $scope.notifier.danger(globalFuncs.errorMsgs[13]);

    }
    $scope.addWatchOnly = function() {
        if ($scope.nickNames.indexOf($scope.addAccount.nickName) !== -1) {
            $scope.notifier.danger(globalFuncs.errorMsgs[13]);
            return;
        } else if ($scope.nickNames.indexOf(ethUtil.toChecksumAddress($scope.addAccount.address)) !== -1) {
            $scope.notifier.danger(globalFuncs.errorMsgs[16]);
            return;
        }
        cxFuncs.addWatchOnlyAddress($scope.addAccount.address, $scope.addAccount.nickName, function() {
            if (chrome.runtime.lastError) {
                $scope.notifier.danger(chrome.runtime.lastError.message);
            } else {
                $scope.notifier.info(globalFuncs.successMsgs[3] + $scope.addAccount.address);
                $scope.setNickNames();
            }
            $scope.$apply();
        });
    }
    $scope.isStrongPass = function(pass) {
        return pass.length > 3;
    }
    $scope.$watch('walletType', function() {
        $scope.showBtnGen = $scope.showBtnUnlock = $scope.showBtnAdd = $scope.showAddWallet = false;
        $scope.addNewNick = $scope.addNewPass = "";
        $scope.addWalletStats = "";
        $scope.addAccount = {
            address: "",
            nickName: "",
            encStr: "",
            password: ""
        };
        $scope.requireFPass = false;
        $scope.fileContent = null;
        $scope.manualprivkey = null;
        $scope.requirePPass = false;
        $scope.manualmnemonic = null;
    });
    $scope.addWalletToStorage = function() {
        if ($scope.nickNames.indexOf($scope.addAccount.nickName) !== -1) {
            $scope.notifier.danger(globalFuncs.errorMsgs[13]);
            return;
        } else if ($scope.nickNames.indexOf(ethUtil.toChecksumAddress($scope.addAccount.address)) !== -1) {
            $scope.notifier.danger(globalFuncs.errorMsgs[16]);
            return;
        }
        cxFuncs.addWalletToStorage($scope.addAccount.address, $scope.addAccount.encStr, $scope.addAccount.nickName, function() {
            if (chrome.runtime.lastError) {
                $scope.notifier.danger(chrome.runtime.lastError.message);
            } else {
                $scope.notifier.info(globalFuncs.successMsgs[3] + $scope.addAccount.address);
                $scope.setNickNames();
            }
            $scope.$apply();
        });
    };
    $scope.importWalletToStorage = function() {
        switch ($scope.ves_status) {
            case 'starting': case 'loading': if ($scope.ves_exists != null) return; break;
            case 'ok': if ($scope.ves_wallet) return $scope.ves_backupDone();
        }
        if (!globalFuncs.isStrongPass($scope.addAccount.password)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[1]);
            return;
        }
        if (!$scope.addAccount.encStr) $scope.addAccount.encStr = JSON.stringify($scope.wallet.toV3($scope.addAccount.password, {
                kdf: globalFuncs.kdf,
                n: globalFuncs.scrypt.n
        }));
        try{
            if ($scope.ves_exists || !$scope.ves_backup_chkbx) throw null;
            $scope.ves_status = 'starting';
            return libVES.instance().delegate().then(function(myVES) {
                $scope.ves_status = 'loading';
                $scope.$apply();
                return globalFuncs.VES_getExtId($scope.addAccount.encStr).then(function(extId) {
                    return myVES.putValue({"domain":myVES.domain,"externalId":extId},$scope.addAccount.password).then(function(vi) {
                        $scope.ves_status = 'ok';
                        $scope.$apply();
                        window.setTimeout(function() {
                            $scope.ves_backupDone();
                            $scope.$apply();
                        },2000);
                    });
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
    }
    $scope.ves_backupDone = function() {
        $scope.addWalletToStorage();
        window.setTimeout(function() {
            $scope.walletType = null;
            $scope.$apply();
        },1000);
    };
    $scope.generateWallet = function() {
        $scope.wallet = Wallet.generate(false);
        $scope.addAccount.address = $scope.wallet.getAddressString();
        $scope.importWalletToStorage();
    }
    $scope.setBalance = function() {
        ajaxReq.getBalance($scope.wallet.getAddressString(), function(data) {
            if (data.error) {
                $scope.etherBalance = data.msg;
            } else {
                $scope.etherBalance = etherUnits.toEther(data.data.balance, 'wei');
                ajaxReq.getETHvalue(function(data) {
                    $scope.usdBalance = etherUnits.toFiat($scope.etherBalance, 'ether', data.usd);
                    $scope.eurBalance = etherUnits.toFiat($scope.etherBalance, 'ether', data.eur);
                    $scope.btcBalance = etherUnits.toFiat($scope.etherBalance, 'ether', data.btc);
                });
            }
        });
    }
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
                var fld = document.getElementsByClassName('ves_retrieve_file')[0];
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
    $scope.ves_backup_chkbx = true;
};
module.exports = addWalletCtrl;
