import HmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import 'url-search-params-polyfill';


class AuthSign {
  // 唯一表示
  static identifier = 'com.nehza.PawExtensions.AuthSign' 
  // 动态值
  static title = 'AuthSign'  
  // 插件说明地址
  static help = 'https://github.com/nehzx/AuthSign.git' 
  // 动态值可以输入多个
  static inputs = [
    DynamicValueInput('authSecret', 'authSecret', "String"),
  ] 

  // 入口方法
  evaluate(context) {
    if (context.runtimeInfo.task != 'requestSend') {
      return '** digest is only generated during request send **'
    }
    // 获取请求对象
    let request = context.getCurrentRequest()
    // 获取输入值
    console.log(this.authSecret)
    return "返回动态值"
  }
}

registerDynamicValueClass(AuthSign)