function clear(obj1,obj2){
    obj1.onclick=function(){
        userName.value=''
        obj1.style.display='none'
    }
    obj2.onclick=function(){
        userPass.value=''
        obj2.style.display='none'
    }
}
