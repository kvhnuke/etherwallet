'use strict';
var cxWalletDecryptDrtv = function() {
	return {
        restrict : "E",
        template : '<div class="row" ng-controller=\'cxDecryptWalletCtrl\'>\n \
      <div class="col-md-4 col-sm-6">\n \
        <h4 translate="decrypt_Select"> Select a Wallet: </h4>\n \
        <div class="radio" ng-repeat="twallet in allWallets  track by $index">\n \
          <label><input type="radio" name="selectedWallet" ng-model="$parent.selectedWallet" value="{{twallet.addr}}"> {{twallet.nick}} <small>({{twallet.balance}} Ether)</small> </label>\n \
        </div>\n \
      </div>\n \
      <div class="col-md-4 col-sm-6" ng-show="selectedWallet!=\'\'">\n \
        <h4 translate="ADD_Label_3"> Your wallet is encrypted. Please enter the password: </h4>\n \
        <input class="ves_retrieve_dec form-control" type="{{vespswdVisible ? \'text\' : \'password\'}}" placeholder="{{ \'x_Password\' | translate }}" ng-model="password" ng-keyup="$event.keyCode == 13 && decryptWallet()" >\n \
        <span tabindex="0" aria-label="make password visible" role="button" class="input-group-addon eye" ng-click="ves_showHidePswd()"></span>\n \
        <div class="ves_retrieve_box">\n \
         <div ng-show="ves_exists">\n \
          <div class="ves_divider ves_divider_second"><hr><span translate="x_VES_or">OR</span></div>\n \
          <div class="ves_retrieve_btn"><a tabindex="0" role="button"\n \
           class="btn"\n \
           ng-click="ves_retrieve()">\n \
           <span translate="x_VES_retrieve1">\n \
             Retrieve your wallet password with VES\n \
           </span>\n \
           <span class="ves_icon"></span></a>\n \
          </div>\n \
          <div class="ves_retrieve_msg">\n \
           <span class="ves_loading_msg" ng-show="ves_status==\'starting\'" translate="x_VES_starting">Connecting to VES...</span>\n \
           <span class="ves_loading_msg" ng-show="ves_status==\'loading\'" translate="x_VES_retrieve_loading">Retrieving your wallet password with VES...</span>\n \
           <span class="ves_success_msg" ng-show="ves_status==\'ok\'" translate="x_VES_retrieve_ok">Your wallet password was successfully retrieved with VES.</span>\n \
           <span class="ves_warn_msg" ng-show="ves_status==\'error_retrieve\'" translate="x_VES_retrieve_error">Your wallet password could not be retrieved with VES.</span>\n \
           <span class="ves_warn_msg" ng-show="ves_status==\'error\'" ng-bind="ves_error_msg"></span>\n \
          </div>\n \
         </div>\n \
         <div class="ves_retrieve_info" ng-show="ves_exists==false">\n \
          <div class="ves_divider"><hr></div>\n \
          <span translate="x_VES_retrieve2">The password for this wallet is not yet backed up with VES.</span><br/>\n \
          <label><input type="checkbox" ng-model="ves_backup_chkbx" /> <a href="https://www.vesvault.com" target="_blank" class="ves_icon_prp" title="VESvault"></a> <span translate="x_VES_retrieve3">Back it up when unlocking the wallet</span></label>\n \
          <div class="ves_retrieve_msg">\n \
           <span class="ves_loading_msg" ng-show="ves_status==\'starting\'" translate="x_VES_starting">Connecting to VES...</span>\n \
           <span class="ves_loading_msg" ng-show="ves_status==\'loading\'" translate="x_VES_backup_loading">Backing up your wallet password with VES...</span>\n \
           <span class="ves_success_msg" ng-show="ves_status==\'ok\'" translate="x_VES_backup_ok">Your wallet password has been successfully backed up with VES.</span>\n \
           <span class="ves_warn_msg" ng-show="ves_status==\'error\'" ng-bind="ves_error_msg"></span>\n \
          </div>\n \
         </div>\n \
         <div class="ves_retrieve_info" ng-show="ves_exists==null">\n \
          <div class="ves_divider"><hr></div>\n \
          <span translate="x_VES_retrieve4">VES backup</span>\n \
          <div class="ves_retrieve_msg">\n \
           <span class="ves_loading_msg" ng-show="ves_status==\'loading\'" translate="x_VES_retrieve5">Checking if your wallet password is backed up with VES...</span>\n \
           <span class="ves_warn_msg" ng-show="ves_status==\'error\'" ng-bind="ves_error_msg"></span>\n \
          </div>\n \
         </div>\n \
        </div>\n \
      </div>\n \
      <div class="col-md-4 col-sm-6" id="walletuploadbutton" ng-show="password.length>0">\n \
        <h4 translate="ADD_Label_6"> Unlock Your Wallet:</h4>\n \
        <div class="form-group"><a ng-click="decryptWallet()" class="btn btn-primary btn-block" translate="ADD_Label_6_short">UNLOCK</a></div>\n \
      </div>\n \
    </div>'
  };
};
module.exports = cxWalletDecryptDrtv;
