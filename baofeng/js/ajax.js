
//封装post 和 get
function ajax(json){
    var ajax = new XMLHttpRequest();//创建异步对象
    ajax.open(json.method,json.url)//设置请求的url参数
    if(json.method=="get"){
        ajax.send()
    }
    if(json.method=="post"){
        ajax.setRequestHeader("Content-type",json.type)
        ajax.send(json.data)
    }
    ajax.onreadystatechange = function () {
        if(ajax.readyState==4 && ajax.status==200){
            json.success(ajax.responseText)
        }
    }


}
