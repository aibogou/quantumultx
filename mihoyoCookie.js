const title = "米游社";
const subTitleNew = "首次添加";
const subTitleUpdate = "更新";
!(async() => {
    $notify("开始",'',"测试成功了");
    getCookie();
    $done();
});
function getCookie(){
    var cookie = $request.headers.Cookie;
    var currentCookie = $prefs.valueForKey("mihoyoCookie");
    if(currentCookie != undefined){
        console.log("正在更新cookie。。。");
        $prefs.setValueForKey(cookie,"mihoyoCookie");
        $notify(title,subTitleUpdate,"更新cookie成功");
    }else{
        console.log("正在添加cookie。。。");
        $prefs.setValueForKey(cookie,"mihoyoCookie");
        $notify(title,subTitleNew,"添加cookie成功");
    }
}