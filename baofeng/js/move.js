/*
 * 参数说明:
 * obj: 运动对象
 * json(json形式): 需要修改的属性
 * options(json形式): 
 *       duration: 运动时间
 *       easing: 运动方式（匀速、加速、减速）
 *       complete: 运动完成后执行的函数
*/  
function animate(obj,json,options){
    var options=options || {};        
    var duration=options.duration || 500;  //运动时间,默认值为500ms;
    var easing=options.easing || 'linear';  //运动方式,默认为linear匀速
    var start={};
    var dis={};
   
    for(var name in json){
      start[name]=parseFloat(getStyle(obj,name));  //起始位置
      dis[name]=json[name]-start[name];      //总距离
    }
   
    var count=Math.floor(duration/18);         //总次数
    var n=0;  //次数
   
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
       if(n>count){
        clearInterval(obj.timer);
        options.complete && options.complete();
      }else{
        for(var name in json){
          switch(easing){
            //匀速
            case 'linear':
              var a=n/count;
              var cur=start[name]+dis[name]*a;  //当前位置
              break;
            //加速
            case 'ease-in':
              var a=n/count;
              var cur=start[name]+dis[name]*a*a*a;
              break;
            //减速
            case 'ease-out':
              var a=1-n/count;
              var cur=start[name]+dis[name]*(1-a*a*a);
              break;
          }
           if(name=='opacity'){
            obj.style.opacity=cur;
            obj.style.filter = 'alpha(opacity='+cur*100+')';  //兼容IE8及以下
          }else{
            obj.style[name]=cur+'px';
          }
        }
      }
      n++;
    },15);
  }
  //获取非行间样式
  function getStyle(obj,sName){
    return (obj.currentStyle || getComputedStyle(obj,false))[sName];
  }