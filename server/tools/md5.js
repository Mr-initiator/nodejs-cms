// md5加密
var crypto = require("crypto");

module.exports = function(string){

    var md5 = crypto.createHash('md5');

    var result = md5.update(string,'utf8').digest('hex');

    return result;
}