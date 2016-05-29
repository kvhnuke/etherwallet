'use strict';
var http;
var ajaxReq = function() {}
ajaxReq.http = null;
ajaxReq.postSerializer = null;
ajaxReq.SERVERURL = "https://rpc.myetherwallet.com/api.php";
ajaxReq.DAOPROPOSALSURL = "https://rpc.myetherwallet.com/TheDAO/getDAOProposals.php";
ajaxReq.COINMARKETCAPAPI = "https://coinmarketcap-nexuist.rhcloud.com/api/";
ajaxReq.pendingPosts = [];
ajaxReq.config = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
};
ajaxReq.getBalance = function(addr, callback) {
	this.post({
		balance: addr
	}, callback);
}
ajaxReq.getTransactionData = function(addr, callback) {
	this.post({
		txdata: addr
	}, callback);
}
ajaxReq.sendRawTx = function(rawTx, callback) {
	this.post({
		rawtx: rawTx
	}, callback);
}
ajaxReq.getEstimatedGas = function(txobj, callback) {
	this.post({
		estimatedGas: txobj
	}, callback);
}
ajaxReq.getEthCall = function(txobj, callback) {
	this.post({
		ethCall: txobj
	}, callback);
}
ajaxReq.queuePost = function() {
    var data = this.pendingPosts[0].data;
    var callback = this.pendingPosts[0].callback;
	this.http.post(this.SERVERURL, this.postSerializer(data), this.config).then(function(data) {
		callback(data.data);
        ajaxReq.pendingPosts.splice(0, 1);
        if(ajaxReq.pendingPosts.length>0)
            ajaxReq.queuePost();
	});
}
ajaxReq.post = function(data, callback) {
	this.pendingPosts.push({
		data: data,
		callback: callback
	});
    if(this.pendingPosts.length==1)
        this.queuePost();
}
ajaxReq.getETHvalue = function(callback) {
	var prefix = "eth";
	this.http.get(this.COINMARKETCAPAPI + prefix).then(function(data) {
		data = data['data']['price'];
		var priceObj = {
			usd: data['usd'].toFixed(6),
			eur: data['eur'].toFixed(6),
			btc: data['btc'].toFixed(6)
		};
		callback(priceObj);
	});
}
ajaxReq.getDAOProposals = function(callback) {
	this.http.get(this.DAOPROPOSALSURL).then(function(data) {
		callback(data.data);
	});
}
module.exports = ajaxReq;