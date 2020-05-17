//播放页面playPage

//猜你喜欢
var imgarr=[];
var title=[];
var detail=[];
var scoreBigArr=[]
var scoreSmallArr=[]
ajax({
        "method":'get',
        "url":'../json/playPage._guess_like.json',
        "success":function(res){
                var obj = eval(res)
            obj.forEach(function (value) {

                    imgarr.push(value.src)
                     title.push(value.tit)
                detail.push(value.details)
                scoreBigArr.push(value.score)
                scoreSmallArr.push(value.s_num)



            })


            broadcast()

        }



})
function broadcast(){
    var guessFilm = document.getElementsByClassName("guessFilm")[0]
    var str1= ''
    var str2=''

    //循环2行  每行4个li
    for(i=0;i<2;i++){

        for(j=0;j<4;j++){
            str2+='<li><a href="#"><img class="geussLike" src=""></a> <div class="detail"><p><a href="#" class="film-title"></a></p><em class="details"></em> <h3 class="BigNum"></h3> </div> </li>'

        }


        str1='<ul class="clearFix">'+str2+'</ul>'
    }
    guessFilm.innerHTML=str1


    var geussLike = document.getElementsByClassName("geussLike")
    var film_title = document.getElementsByClassName("film-title")
    var details =  document.getElementsByClassName("details")
    var BigNum = document.getElementsByClassName("BigNum")


    for(i=0;i<geussLike.length;i++){

        geussLike[i].src=imgarr[i]
        film_title[i].innerHTML=title[i]
        details[i].innerHTML=detail[i]
        BigNum[i].innerHTML =scoreBigArr[i]+'<i>'+scoreSmallArr[i] + '</i>'
    }


}


//电影榜
var indexs=[]
var bricker=[]
var rankArr=[]
var rankTitle=[]
var scoreArr = []
ajax({
    "method":'get',
    "url":'../json/playPage_rank.json',
    "success":function(res){
        var obj = eval(res)
        obj.forEach(function (value) {


            bricker.push(value.briSrc)
            rankArr.push(value.rank)
            rankTitle.push(value.title)
            scoreArr.push(value.score)
            indexs.push(value.indexes)
        })


        brick()


    }



})
function brick(){

    var movie_list = document.getElementsByClassName("movie-list")[0]
        var str3 = '';
        //9个排行榜
        for(i=0;i<9;i++){
            str3+='<div class="clearFix list-items"><dt class=" clearFix block-item"><em class="icon-num"></em><a class="movie-name" href=""></a><span class="scores"></span></dt> <dd class="non-item" > <div><a href="#"><img class="rankImg"src="" alt=""><span class="hot-movie-num"></span><span class="hot-movie-shadow"></span></a><p class="movie-titles"><a href="#" class="movie-s"></a></p></div></dd></div>'
        }
    movie_list.innerHTML=str3



    var block_item = document.getElementsByClassName("block-item")
    var non_item = document.getElementsByClassName("non-item")
    var list_items = movie_list.getElementsByClassName("list-items")[0];
    var dt = list_items.getElementsByTagName("dt")
    var dd = list_items.getElementsByTagName("dd")

    dt[0].style.display='none';
    dd[0].style.display='block';
    var len = block_item.length

    for(i=0;i<len;i++){
        block_item[i].index= i;

        block_item[i].onmouseover=function(){
            for(i=0;i<len;i++){
                non_item[i].style.display="none";
                block_item[i].style.display="block";
            }

            non_item[this.index].style.display="block"
            block_item[this.index].style.display="none";
        }




    }




    var hot_movie_num = document.getElementsByClassName("hot-movie-num")
    var movie_name = document.getElementsByClassName("movie-name")
    var movie_s = document.getElementsByClassName("movie-s")
    var rankImg = document.getElementsByClassName("rankImg")
    var scores = document.getElementsByClassName("scores")
    var icon_num = document.getElementsByClassName("icon-num")


    for(i=0;i<rankImg.length;i++){

        rankImg[i].src=rankArr[i]
        movie_name[i].innerHTML=rankTitle[i]
        movie_s[i].innerHTML=rankTitle[i]
        scores[i].innerHTML=scoreArr[i]
        icon_num[i].innerHTML=indexs[i]

        hot_movie_num[i].innerHTML=indexs[i]




    }


}


//热门评论
var header=[]
var data=[]
var names = []
var Ctimes=[]
var Love=[]
ajax({
    "method":'get',
    "url":'../json/playPage_comments.json',
    "success":function(res){
        var cmts = eval(res)

        cmts.forEach(function (value) {

            header.push(value.head)
            data.push(value.comment)
            names.push(value.name)
            Ctimes.push(value.cmtDate)
            Love.push(value.lovs)
        })
        var len = Love.length
        //按热度
        sorts(fromHot,fromNew,cmts)
        //按更新
        sorts(fromNew,fromHot,cmts)
        CMTs()

    }



})

// 封装热度/最新 if判断 最新/最热
function sorts(obj1,obj2,server) {

    var len = Love.length
    obj1.onclick=function () {
        obj1.className='blue'

        obj2.className=''

        header.splice(0,len)
        data.splice(0,len)
        names.splice(0,len)
        Love.splice(0,len)
        Ctimes.splice(0,len)
    if(obj1==fromNew){
        toNewSort(server)
    }
    else if(obj1==fromHot){
        toHotSort(server)
    }

        server.forEach(function (value) {

            header.push(value.head)
            data.push(value.comment)
            names.push(value.name)
            Ctimes.push(value.cmtDate)
            Love.push(value.lovs)

        })

        CMTs()
    }

}

//热度比较 sorts函数调用
function toHotSort(ser) {
    ser.sort(function (a,b) {

        return b.lovs-a.lovs

    });
}

//最新比较 sorts函数调用
function toNewSort(ser) {
    ser.sort(function (a,b) {

        return Date.parse(b.cmtDate)-Date.parse(a.cmtDate)

    });
}

//评论区数据填充
function CMTs(){
    var lens = data.length;
    var rest = []
    var pics =[]
    var userName=[]
    var comments_time=[]
    var loves=[]
    var ulPage = document.getElementsByClassName("pages")[0]
    var total_page =  document.getElementsByClassName("total-page")[0]
    var jump = document.getElementById("jump")
    for(var i=0;i<lens;i+=6){
        rest.push(data.slice(i,i+6))
        pics.push(header.slice(i,i+6))
        userName.push(names.slice(i,i+6))
        comments_time.push(Ctimes.slice(i,i+6))
        loves.push(Love.slice(i,i+6))
    }


    function Pages(j) {
        var newlens = rest[j].length
        var str = ''
        for(var i=0;i<newlens;i++){
            str+='<li><div class="personal-info"><div class="pichead"><a href="#"><img class="userImg" src="' +pics[j][i]  + ' "alt=""></a></div><div class="dates"></div><p class="users-name">'+userName[j][i]  +'</p><p class="comments-time">'+ comments_time[j][i]+'</p> </div> </div> <p class="yourComments">' + rest[j][i] + '</p> <div class="myLikes"> <span class="comments-support"> <a href="" class="jubao">举报</a> <a href="" class="zan"></a> <em class="zan-num">'  +loves[j][i]+'</em> </span> </div> </li>'

        }
        ulPage.innerHTML = str;
        jump.value=j+1
        total_page.innerHTML=rest.length;

    }

    Pages(0)
    var n = 0
    next.onclick = function(){

        if(n>=rest.length-1){
            n = rest.length-1
            alert('最后一页')
        }else{
            n++

            Pages(n)
        }
    }
    pre.onclick = function(){

        if(n<=0){
            n = 0
            alert('第一页')
        }else{
            n--
            Pages(n)
        }
    }
}


//热门推荐
var recArr=[]
var HotTitle=[]
ajax({
    "method":'get',
    "url":"../json/playPage_hot_recommend.json",
    "success":function (res) {
           var rec = eval(res)
        rec.forEach(function (value) {
                recArr.push(value.src)
            HotTitle.push(value.tit)
        })
        hotRecommend()
    }




})
function hotRecommend() {

    var h_recommend=document.getElementsByClassName("h-recommend")[0]

    var str4=''
        for(i=0;i<3;i++){

            str4+="<li>"
                for(j=0;j<3;j++){
                    str4+='<div class="brick-item"><a  class="bricks" href="#"><img src="" alt=""class="Bricks"><span class="shadow"></span></a></div>'


                }
            str4+="</li>"
        }
    h_recommend.innerHTML=str4

    var Bricks = document.getElementsByClassName("Bricks")
    var bricks = document.getElementsByClassName("bricks")

    for(i=0;i<recArr.length;i++){
        Bricks[i].src=recArr[i];
        bricks[i].setAttribute("datas",HotTitle[i])//设置自定义属性值
    }
}


//选集
var ItemsArr=[]
ajax({
    "method":'get',
    "url":"../json/playPage_selectItms.json",
    "success":function (res) {
            var itms = eval(res)
        itms.forEach(function(value){
            ItemsArr.push(value.title)

        })
        selectItems()
    }


})
function selectItems(){
var menu_items = document.getElementsByClassName("menu-items")[0]
var str5=''

    for(i=0;i<ItemsArr.length;i++){
        str5+='<li><a href=""><span class="tits"></span><em>&nbsp;</em></em></a></li>'
    }
    menu_items.innerHTML=str5

    var tits = document.getElementsByClassName("tits")

        for(i=0;i<ItemsArr.length;i++){
            tits[i].innerHTML=ItemsArr[i]
        }
}

var up = document.getElementById("up")
//回到顶部
upTop(up)
