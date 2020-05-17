function setCookie(key,value,day){
       
       
    var date = new Date();  
 date.setDate(date.getDate()+day)
    document.cookie=key + '=' + value +';expires=' + date

}

//封装获取cookie
function getCookie(key){
      
        var obj = {}
        var cookie = document.cookie.split("; ")
        for(i=0;i<cookie.length;i++){
            var arr =cookie[i].split("=")
               obj[arr[0]]=arr[1]
              
        }
        return obj[key]
        
        
         
}  

//删除cookie
function removeCookie(key){
setCookie(key,1,-1)
}


