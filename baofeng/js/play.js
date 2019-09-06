//播放页面

//最近更新
var vip_arr=[]
var dataArr=[]
var titleArr=[]
var scoreBigArr=[]
var scoreSmallArr=[]
ajax({
"method":'get',
    "url":"../json/play.json",
    "success":function (res) {

        var obj = eval(res)
        var val = eval(res)
        obj.forEach(function (value) {
            vip_arr.push(value.src)
            dataArr.push(value.data)
            titleArr.push(value.title)
            scoreBigArr.push(value.score)
            scoreSmallArr.push(value.s_num)

        })


        //最受欢迎
     var len = vip_arr.length
        welcome.onclick=function () {
            welcome.className='white'
            welcome.style="border-left:1px solid #dedede;"
              update.className=''

            vip_arr.splice(0,len)
            dataArr.splice(0,len)
            titleArr.splice(0,len)
            scoreBigArr.splice(0,len)
            scoreSmallArr.splice(0,len)
            obj.sort(function (a,b) {
                if(b.score==a.score){
                    return b.s_num-a.s_num;
                }
                return b.score-a.score

            })

            obj.forEach(function (value) {

                vip_arr.push(value.src)
                dataArr.push(value.data)
                titleArr.push(value.title)
                scoreBigArr.push(value.score)
                scoreSmallArr.push(value.s_num)




            })

            play()
        }

        //最近更新
        update.onclick=function () {
            welcome.className=''
            update.className="white"
            welcome.style="border-left:0px"

            vip_arr.splice(0,len)
            dataArr.splice(0,len)
            titleArr.splice(0,len)
            scoreBigArr.splice(0,len)
            scoreSmallArr.splice(0,len)

            val.sort(function (a,b) {

                return b.date-a.date

            })

            val.forEach(function (value) {

                vip_arr.push(value.src)
                dataArr.push(value.data)
                titleArr.push(value.title)
                scoreBigArr.push(value.score)
                scoreSmallArr.push(value.s_num)




            })

            play()
        }

        play()

    }


    
})
function play() {
    var less = parseInt(vip_arr.length / 5 + 1)

    var vip_movie = document.getElementsByClassName("vip-movie")[0]

    var string1 = '';
    var string2 = '';

    for(i=0;i<less;i++){
        for(j=0;j<5;j++){
            string2+= '<li class="free_vip" data-info="VIP免费" data-clear="超清"><a href="../html/playPage.html"><img src="" alt=""></a> <div class="detail"> <p><a href="#" class="film-title"></a></p><em class="data"></em> <h3 class="BigNum"></h3> </div></li>'
        }

    }
    string1+='<ul class="clearFix">'+string2+'</ul>'


vip_movie.innerHTML=string1

    for(i=0;i<4;i++){
        $(".free_vip").eq(-i-1).css("display","none")
    }





    var data = document.getElementsByClassName("data")
    var img_vip = vip_movie.getElementsByTagName("img")
    var film_title = document.getElementsByClassName("film-title")
    var BigNum = document.getElementsByClassName("BigNum")


    for (i = 0; i < img_vip.length; i++) {

        img_vip[i].src = vip_arr[i]
        data[i].innerHTML = dataArr[i]
        film_title[i].innerHTML = titleArr[i]
        BigNum[i].innerHTML = scoreBigArr[i] + '<i>' + scoreSmallArr[i] + '</i>'


        var welcome = document.getElementById("welcome")

    }

}



//回到顶部
var up = document.getElementsByClassName("up")[0]
upTop(up)


