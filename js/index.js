/**
 * Created by Administrator on 2019/8/26.
 */

//轮播图开始
var imgarr = [];
var s_imgarr=[]
var linkArr=[]
ajax({

    "method":"get",
    "url":"./json/indexRunning.json",
    "success":function(res){

        var obj = eval(res)

        obj.forEach(function (value) {
            imgarr.push(value.src)
            s_imgarr.push(value.s_src)
            linkArr.push(value.links)
        })

        lunbo();

    }

})




function lunbo() {

    var photo = document.querySelector(".photo")
    var circle = document.querySelector(".circle")
    var li = circle.getElementsByTagName("li")
    var bright= circle.getElementsByTagName("img")
    var ul = document.getElementsByClassName("photo-ul")



    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var n=0

    //span,li动态增加
    var str1='';
    var str2='';
    for(i=0;i<imgarr.length;i++){


        str2+="<li> <a href='./html/playPage.html'><img src=' "   +imgarr[i]+"'alt=''></a></li>"
        ul[0].innerHTML=str2;

    }

    for(i=0;i<imgarr.length;i++){
        str1+='<li><a href="'+linkArr[i]+'"><img src="'+ s_imgarr[i]+'" alt=""></a></li>'
    }
    ul[0].style.width=imgarr.length*1100+"px"

    circle.innerHTML=str1;
    bright[0].className='bright';
//清除最后一张图片
    circle.lastElementChild.style.display='none'

    //轮播效果
    var n = 0
    var c = 0
    var timer =setInterval(autoNext,2000)
    function autoNext() {
        n++
        if (n > imgarr.length - 1) {
            n = 1;
            ul[0].style.left = '0px'

        }
        animate(ul[0], { left: -1100 * n }, { dutation: "300ms", easing: "linear", })
        c++
        if (c >= li.length - 1) {
            c = 0;
        }
        for (i = 0; i < li.length - 1; i++) {
            bright[i].className = ''
        }
        bright[c].className = "bright"

    }


    //鼠标悬停 停止
    //鼠标离开 轮播
    photo.onmouseover=function(){
        clearInterval(timer)
    }
    photo.onmouseout=function(){
        timer =setInterval(autoNext,2000)
    }



    //左侧按钮

    left.onclick=function(){
        n--;

        if(n<0){

            n=imgarr.length-2;
            ul[0].style.left='-9900px'
        }


        animate(ul[0],{left:-1100*n},{dutation:"1500ms",easing:"linear",})
        c--;
        if(c<0){
            c=li.length-2
        }
        for (i = 0; i < li.length - 1; i++) {
            bright[i].className = ''
        }
        bright[c].className = "bright"


    }
    //右侧侧按钮

    right.onclick=function(){
        n++;

        if(n==imgarr.length){
            n=1;
            ul[0].style.left='0px'
        }


        animate(ul[0],{left:-1100*n},{dutation:"500ms",easing:"linear",})
        c++
        if (c >= li.length-1) {
            c = 0;
        }
        for (i = 0; i < li.length - 1; i++) {
            bright[i].className = ''
        }
        bright[c].className = "bright"


    }


    //小图片
    for(i=0;i<bright.length;i++){
        bright[i].index=i;//自定义索引
        bright[i].onmouseover=function(){//鼠标滑过，再次遍历，清除类名




            for(i=0;i<li.length;i++){
                bright[i].className='' //内部i=6


            }


            this.className='bright' ;


            n=this.index;//获取此时n的值--------返回到左右箭头判断
            c = n
            animate(ul[0],{left:-1100*n},{dutation:"500ms",easing:"linear",})
        }




    // }



}




}

var dataInfo = []
var IMG=[]
var Films_title=[]
var Score = []
var Detail = []
ajax({

    "method":"get",
    "url":"./json/indexRecommend.json",
    "success":function(res){

        var val = eval(res)

        val.forEach(function (value) {
            dataInfo.push(value.data)
            IMG.push(value.src)
            Films_title.push(value.title)
            Score.push(value.scores)
            Detail.push(value.details)
        })

        RecommendFilm();

    }


})
function RecommendFilm(){
    var str = ''

    var vipMV1 = document.getElementsByClassName("vipMV1")[0]
    var len=IMG.length;

    for(i=0;i<len;i++){
str+=' <li data-info="' + dataInfo[i]+'" data-clear="超清"><a href="./html/playPage.html"><img src="' +IMG[i]+ '" alt=""></a> <div class="detail"> <p><a href="#" class="film-t">'+Films_title[i] +'</a></p><em>'+Detail[i]+'</em> <h3>'+Score[i]+'</h3> </div> </li>'

    }
    vipMV1.innerHTML=str;


}

var hot_dataInfo = []
var hot_IMG=[]
var hot_Films_title=[]
var hot_Score = []
var hot_Detail = []

ajax({

    "method":"get",
    "url":"./json/indexHot.json",
    "success":function(res){

        var hot = eval(res)

        hot.forEach(function (value) {
            hot_dataInfo.push(value.data)
            hot_IMG.push(value.src)
            hot_Films_title.push(value.title)
            hot_Score.push(value.scores)
            hot_Detail.push(value.details)
        })

        HotFilm();

    }


})
function HotFilm(){
    var str = ''

    var vipMV2 = document.getElementsByClassName("vipMV2")[0]
    var lenss=hot_IMG.length;

    for(i=0;i<lenss;i++){
        str+=' <li data-info="' + hot_dataInfo[i]+'" data-clear="超清"><a href="./html/playPage.html"><img src="' +hot_IMG[i]+ '" alt=""></a> <div class="detail"> <p><a href="#" class="film-t">'+hot_Films_title[i] +'</a></p><em>'+hot_Detail[i]+'</em> <h3>'+hot_Score[i]+'</h3> </div> </li>'

    }
    vipMV2.innerHTML=str;


}
var up = document.getElementById("up")
//回到顶部
upTop(up)


//特权轮播按钮
var vip_left=document.getElementsByClassName("vip-left")[0]
var vip_right=document.getElementsByClassName("vip-right")[0]
 var run = document.getElementsByClassName("run")[0]

vip_left.onclick=function(){

    run.style.left='0px'




}

vip_right.onclick=function(){

    run.style.left='-1075px'

    

}

player.onclick=function(){
    player.style="background: #0b68c8;"
}