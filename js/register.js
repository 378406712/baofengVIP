// 注册页面

var register_message = document.getElementsByClassName("register-message")[0]
var phone_num = document.getElementsByClassName("phone-num")[0]
var pwd = document.getElementsByClassName("pwd")[0]
var btnRegister = document.getElementById("btnRegister")
function test(mobile) 
   { 
       if(mobile.length==0)
       { 
        register_message.innerHTML='手机号格式不正确'
        
          return false; 
       }     
       if(mobile.length!=11) 
       { 
        register_message.innerHTML='请输入有效的手机号码！'; 
    
           return false; 
       } 
        
       var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
       if(!myreg.test(mobile)) 
       { 
        register_message.innerHTML='请输入有效的手机号码！'; 
         
           return false; 
       } 
       else{
        register_message.innerHTML='';
        return true;
       }
   }
  

   phone_num.onblur=function(){
    test(phone_num.value)
   }

function checkPwd(pword){
	        var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/
	        var re = new RegExp(reg)
	        if (!re.test(pword)) { 
                register_message.innerHTML='请输入6-32位英文、数字和符号的组合密码'; 
                return false;
            }
            else{
                register_message.innerHTML=''
                return true;
            }
    }

    pwd.onblur=function(){
        checkPwd(pwd.value)
        
       
    }

    btnRegister.onclick=function(){
       
        if(test(phone_num.value)!=false&& checkPwd(pwd.value)!=false){
            setCookie(phone_num.value,pwd.value)
            alert("注册成功!")
           window.location='../html/login.html'
        }

       
    }
    var clearIt = document.getElementsByClassName("clearIt")
    phone_num.onkeyup=function(){
        if( phone_num.value==''){
        clearIt[0].style.display='none'
    }
    else{
        clearIt[0].style.display='block'
    }
     
    }

    clearIt[0].onclick=function(){
        
        clearIt[0].style.display='none'
        phone_num.value=''
        phone_num.focus()
    }

    


    pwd .onkeyup=function(){
        var passwords = pwd .value
       
        var tag=/[a-zA-Z]/g//匹配字母
        var num = /\d/g//匹配数字
        var str = /\W/g
        if(passwords.length>12&&tag.exec(passwords)!=null&&num.exec(passwords)!=null&&str.exec(passwords)!=null){
            prohibit.style="background-position: -129px -70px"
        }
        else if(passwords.length>6&&tag.exec(passwords)!=null&&num.exec(passwords)!=null){
            prohibit.style="background-position: -99px -70px"
        }
        else if(passwords.length==0||num.exec(passwords)==null)
        prohibit.style="background-position: -40px -70px"
        else if(passwords.length<6||num.exec(passwords)!=null){
            prohibit.style="background-position: -70px -70px"
        }
       
    }

    
    