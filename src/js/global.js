import {
    baseURL, ENV
} from '../js/config.js';
const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const navigator = weex.requireModule('navigator');
const navigatorEx = weex.requireModule('navigatorEx');
const stream = weex.requireModule('stream');
const meta = weex.requireModule('meta');
function getContextPath() {
    let url = weex.config.bundleUrl;
    if (url.indexOf('?') > 0) {
        url = url.substring(0, url.indexOf('?'));
    }
    url = url.split('/').slice(0, -1).join('/');
    return url;
}
const global = {
    install: function (Vue, option) {
        Vue.$MD =  {};
        Vue.prototype.$MD = Vue.$MD;
        let MD = Vue.prototype.$MD;
        MD.Vue = Vue;

        MD.Env = {
            baseURL: baseURL,
            envCode: ENV
        };
        MD.Util = {
            greet: function(param) {
                let message = param ? param : 'hello, nick';
                console.log(message)
                modal.toast({ message: message, duration: 1 });
            }
        }
        MD.route = {
            push: function(url, params, callback) {
                let paramsStr = "";
                if (params) {
                    for (let key in params) {
                        paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
                    }
                }
                if (url.indexOf('?') < 0 && paramsStr != "") {
                    url += "?";
                }
                url += paramsStr;
                //link平台中使用navigatorEx,playground中使用navigator
                try {
                    if (url.indexOf('http') == 0 || url.indexOf('file') == 0) navigatorEx.push(url);
                    else {
                        url = getContextPath() + '/' + url;
                        navigatorEx.push(url);
                    }
                } catch (ex) {
                    if (url.indexOf('http') == 0 || url.indexOf('file') == 0) {
                        navigator.push({
                            url: url,
                            animated: 'true'
                        }, callback);
                    } else {
                        url = getContextPath() + '/' + url;
                        let message = url
                        console.log(message)
                        modal.toast({ message: message, duration: 1 });
                        navigator.push({
                            url: url,
                            animated: 'true'
                        }, callback);
                    }
                }
            },
            pop: function() {
                let message = `message: route pop`
                console.log(message)
                modal.toast({ message: message, duration: 1 });
            }
        }
        MD.toast = function(message, duration = 1) {
            modal.toast({ message, duration});
        };
               MD.Env = {
            baseURL: baseURL,
            envCode: ENV
        };

        let plateform = weex.config.env.platform;
        MD.platform = {
            name: plateform
        }
        //web 绑定$MD, 方便调试查看全局方法
        if(plateform === 'Web') {
            window.$MD = MD;
        }
 
    }
}

export default global;