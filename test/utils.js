

const sinon = require('sinon');
const os = require('os');

function utils() {
}

utils.prototype.changOs = function(os) {
    sinon.spy(os, 'platform').returned(os);
}