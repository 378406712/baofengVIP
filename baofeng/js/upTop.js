/**
 * Created by Administrator on 2019/9/1.
 */
function upTop(obj) {

    obj.style.display='none'
    window.onscroll=function (){
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;

        if(scrollTop>0) {
            obj.style.display = 'block'
        }
        else{
            obj.style.display = 'none'
        }

    }

   $(obj).click(function () {
       $('html').animate({scrollTop:0},500)
   })


}
