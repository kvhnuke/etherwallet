var libVES = require('./libVES.node.js');

libVES.instance = function() {
    var app = "MyEtherWallet";
    var domain = "cryptoWallets";
    libVES.Domain[domain] = {
	vaultRefToUser: function(vaultRef,VES) {
	    return vaultRef.externalId;
	},
	userToVaultRef: function(user, VES) {
	    return user.getEmail().then(function(email) {
		return {domain: domain, externalId: email};
	    });
	}
    };
    return new libVES({app:app,domain:domain});
}

module.exports = libVES;
