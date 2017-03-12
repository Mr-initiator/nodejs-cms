var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  
  // 获取Token
  var token = (req.query && req.query.Token) || req.headers['Token'];

  // 如果token存在
  if (token) {

    try {

      // 解析Token
      var decoded = jwt.decode(token,global.config.jwtsecret);

      // 如果Token过期
      if (decoded.exp <= Date.now()) {

        res.json({code:10,message:'令牌过期'});

        return;

      }

      // Token验证通过 继续执行
      next();

    } catch (err) {

      // Token解析不成功
      res.json({code:11,message:'Token解析失败'});

      return;

    }

  } else {

    // Token不存在
    res.json({code:12,message:'Token解析失败'});

    return;

  }

};