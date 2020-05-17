
var n=5;
var num = document.getElementsByClassName("num")[0]
var clickMe =  document.getElementsByClassName("clickMe")[0]
var timer= setInterval(function(){
    
        n--;

        if(n<=0){
            n=0
            setTimeout(function(){  window.location='../index.html'},1000)

            
         
        }
      num.innerHTML=n

},1000)

clickMe.onclick=function(){
    location.reload("jump.html") 
}