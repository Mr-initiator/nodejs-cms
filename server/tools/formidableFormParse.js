var formidable = require('formidable');
var path = require('path');
exports.formidableFormParse = function(req,callback){
    var obj ={};
    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:path.join(__dirname + '/../uploads/'),  //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.parse(req)
        .on('field', function(name, value) {  // 字段
            obj[name] = value;
        })
        .on('file', function(name, file) {  //文件
            obj[name] = file;
        })
        .on('error', function(error) {  //结束
            callback(error);
        })
        .on('end', function() {  //结束
            callback(null,obj);
        });
}