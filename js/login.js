//登录页面

var userName = document.getElementsByClassName("userName")[0]
var userPass = document.getElementsByClassName("userPass")[0]
var login_message = document.getElementsByClassName("login-message")[0]
var clearIt =  document.getElementsByClassName("clearIt")
btnLogin.onclick=function(){
   var passes=  getCookie(userName.value)
   if(userName.value==''){
    login_message.innerHTML='请输入账号'
}
   else if(userPass.value==''){
        login_message.innerHTML='请输入密码'
    }

    
    else if(userPass.value==passes){
        alert('登录成功')
       setTimeout(function(){window.location='jump.html'},1000)
     }
   
        else{
            login_message.innerHTML='用户名或密码错误'
        }
}
userName.onkeyup=function(){
    if( userName.value==''){
    clearIt[0].style.display='none'
}
else{
    clearIt[0].style.display='block'
}
 
}
userPass.onkeyup=function(){
    if( userPass.value==''){
    clearIt[1].style.display='none'
}
else{
    clearIt[1].style.display='block'
}
 
}

clear(clearIt[0],clearIt[1])
