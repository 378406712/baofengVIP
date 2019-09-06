
   
    //封装滚轮事件-----------------------------------------------------
    function mouseWheel(obj, fn) { //封装滚轮
        if (window.navigator.userAgent.indexOf('Firefox') != -1) {
            obj.addEventListener('DOMMouseScroll', wheelFn, true);

        } else obj.onmousewheel = wheelFn;

        function wheelFn(ev) {
            ev = ev || event;
            var direct = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
            fn && fn(direct); //将direct作为参数传递出去
            if (window.event) { //IE
                ev.returnValue = false; //ie 阻止默认事件
                return false; //ie9 以上阻止
            } else {
                ev.preventDefault(); //阻止默认事件 firefox
            }
        };
    };

    //滚轮滚动----------------------------------------
    var menulist = document.getElementById('menu-list');
  var menu_window = document.getElementsByClassName("menu-window")[0]
    var scroller = document.getElementById('scroller');
    

    var dis_p = menu_window.offsetHeight - menulist.offsetHeight; //p的高度减去box的高度
    var dis_span = menulist.offsetHeight - scroller.offsetHeight; //滑块移动距离

    //滚轮比率
    var wheel_rate = dis_span / dis_p;
    mouseWheel(menulist, function(dir) {
        if (dir) {
            var t = menu_window.offsetTop - 30;
            if (t < -dis_p) t = -dis_p;
            menu_window.style.top = t + 'px';
            scroller.style.top = -t * wheel_rate + 'px';
        } else {
            var t = menu_window.offsetTop + 30;
            if (t > 0) t = 0;
            menu_window.style.top = t + 'px';
            scroller.style.top = -t * wheel_rate + 'px';
        }
    });


    //拖拽----------------------------------------------
    scroller.onmousedown = function(ev) {
        ev = ev || window.event;
        var mt = ev.clientY - this.offsetTop; //只取Y方向

        document.onmousemove = function(ev) {
            ev = ev || window.event;
            var t = ev.clientY - mt;
            if (t <= 0) t = 0; //限制顶部位置
            if (t >= dis_span - 2) t = dis_span; //限制底部位置
            //计算移动比率
            move_rate = t / dis_span;
            menu_window.style.top = -dis_p * move_rate + 'px'; //移动比率
            scroller.style.top = t + 'px';
        };
        document.onmouseup = function() {
            document.onmousemove = null;
        };
        return false; //阻止选中文字
    };
