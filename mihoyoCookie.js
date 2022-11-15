const title = "米游社";
const subTitleNew = "首次添加";
const subTitleUpdate = "更新";
var cookie = "";
var uid = "";
var region = "";
const infoUrl = "https://api-takumi.mihoyo.com/binding/api/getUserGameRoles?action_ticket=rEcgcuebzFmcFrCif8I5SvbmmxKe3gQenMTrv3Lm&game_biz=hk4e_cn`;";
async() => {
    init();
    if(cookie === "" || cookie === undefined){
        console.log("未配置cookie，请先配置cookie");
        getCookie();
    }else{
        sign();
    }
    $done();
};
function init(){
    cookie = $prefs.valueForKey("mihoyoCookie");
    let role = getGameRole(cookie);
    uid = role.uid;
    region = role.region;
}
function getCookie(){
    var cookie = $request.headers.Cookie;
    var currentCookie = $prefs.valueForKey("mihoyoCookie");
    if(currentCookie !== undefined){
        console.log("正在更新cookie。。。");
        $prefs.setValueForKey(cookie,"mihoyoCookie");
        $notify(title,subTitleUpdate,"更新cookie成功");
    }else{
        console.log("正在添加cookie。。。");
        $prefs.setValueForKey(cookie,"mihoyoCookie");
        $notify(title,subTitleNew,"添加cookie成功");
    }
}
function sign(){
    let request = getData("sign");
    $task.fetch(request).then(response => {
        console.log(response.statusCode + "\n\n" + response.body);
        $notify("签到","签到成功");
    }, reason => {
        console.log(reason.error);
    });
}
function getGameRole(cookie){
    let url = 'https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn'
    let request = {
        method: 'GET',
        headers: {
            Cookie: cookie
        },
        url: url
      }
      $task.fetch(request).then(response => {
        let uid = response.body.data.list[0].game_uid;
        let region = response.body.data.list[0].region;
        return {uid,region} = {}
    }, reason => {
        console.log(reason.error);
    });
}
function getData(type){
    var urlMap = {
        //角色信息
    
        //签到
        sign: {
            url: 'https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign',
            body: {uid: uid,region: 'cn_gf01',act_id: 'e202009291139501' },
            method: 'POST',
            sign: true
        },
        //签到信息
        resign_info: {
            url: 'https://api-takumi.mihoyo.com/event/bbs_sign_reward/info',
            method: 'GET',
            query: `uid=${uid}&region=cn_gf01&act_id=e202009291139501`
        },
        //补签
        resign: {
            url: 'https://api-takumi.mihoyo.com/event/bbs_sign_reward/resign',
            body: {uid: uid,region: 'cn_gf01',act_id: 'e202009291139501' },
            method: 'POST',
            sign: true
        },
        //补签信息
        resign_info: {
            url: 'https://api-takumi.mihoyo.com/event/bbs_sign_reward/resign_info',
            method: 'GET',
            query: `uid=${uid}&region=cn_gf01&act_id=e202009291139501`
        }
    
    }
    let{url,query,body,sign,method} = urlMap[type];
    if(query) url += `?${query}`;
    if(body) body = JSON.stringify(body);
    let headers = getHeaders();
    headers.Cookie = cookie;
    return {url,body,headers,method}
}
function getDs (q = '', b = '') {
    let n = ''
    if (['cn_gf01', 'cn_qd01'].includes(this.server)) {
      n = 'xV8v4Qu54lUKrEYFZkJhB8cuOh9Asafs'
    } else if (['os_usa', 'os_euro', 'os_asia', 'os_cht'].includes(this.server)) {
      n = 'okr4obncj8bw5a65hbnn5oo6ixjc3l9w'
    }
    let t = Math.round(new Date().getTime() / 1000)
    let r = Math.floor(Math.random() * 900000 + 100000)
    let DS = md5(`salt=${n}&t=${t}&r=${r}&b=${b}&q=${q}`)
    return `${t},${r},${DS}`
  }

  /** 签到ds */
function getDsSign () {
    /** @Womsxd */
    const n = 'Qqx8cyv7kuyD8fTw11SmvXSFHp7iZD29'
    const t = Math.round(new Date().getTime() / 1000)
    const r = getRandomString('abcdefghijklmnopqrstuvwxyz0123456789', 6).join('')
    const DS = md5(`salt=${n}&t=${t}&r=${r}`)
    return `${t},${r},${DS}`
  }
function getGuid () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
function getRandomString(t,n){
  a = t.length;
  s = "";
  for (i = 0; i < n; i++) s += t.charAt(Math.floor(Math.random() * a));
  return s
}
function getHeaders(){
    return {
            'Connection' : `keep-alive`,
            'Accept-Encoding' : `gzip, deflate, br`,
            'DS' : getDsSign(),
            'x-rpc-device_id' : getGuid(),
            'x-rpc-client_type' : `5`,
            'Content-Type' : `application/json;charset=utf-8`,
            'Origin' : `https://webstatic.mihoyo.com`,
            'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.38.1`,
            'Host' : `api-takumi.mihoyo.com`,
            'Referer' : `https://webstatic.mihoyo.com/`,
            'x-rpc-app_version' : `2.38.1`,
            'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
            'Accept' : `application/json, text/plain, */*`,
            Cookie: $prefs.valueForKey("mihoyoCookie")
        }
}