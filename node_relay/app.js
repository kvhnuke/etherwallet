#!/usr/bin/env node
var BigNumber = require('bignumber.js');
var Web3 = require("web3");
var web3;

var solc = require("solc");
var Transaction = require("ethereumjs-tx");
var util = require("ethereumjs-util");

var defaultGasPrice = "0x04e3b29200"; //21 Gwei
var defaultGasLimit = "0x0249f0"; //150000

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  web3 = new Web3(new Web3.providers.HttpProvider("http://52.87.160.47:8545"));
}
if (web3.isConnected()) 
  console.log("Web3 connection established");
else
  throw "No connection";

 
app.post('/api', function(req, res) {
  var data = req.body;

  if ("balance" in data) {
    web3.eth.getBalance(data["balance"])
  }

  
  console.error('Invalid Request: ' + action);
  res.status(400).send();
});

function formatAddress(addr){
    if (addr.substring(0, 2) == "0x")
        return addr;
    else
        return "0x" + addr;
}
function getDefaultResponse(){
  data = {
    "error": false,
    "msg": "",
    "data": ""
  }
    return data;
}
function bchexdec(hex) {
  dec = new BigNumber(0);
  len = hex.length;
  for (var i = 1; i <= len; i++) {
    var bcmul = new BigNumber(parseInt(hex[i - 1], 16)).times(new BigNumber(16).pow(len - i));
    dec = dec.plus(bcmul);
  }
  return dec;
}