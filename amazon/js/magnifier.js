class Large {
    constructor() {
        this.sBox = document.querySelector(".imgTagWrapper");
        this.sImg = document.querySelector(".imgTagWrapper img");
        this.sSpan = document.querySelector(".magnifierLens");
        this.bBox = document.querySelector(".detailImg");
        this.bImg = document.querySelector(".detailImg img");
        this.cBox = document.querySelector('.zoomWindow');
    }


    addEvent() {
        var that = this;
        this.sBox.onmouseover = function() {
            that.over();
        }
        this.sBox.onmousemove = function(eve) {
            var e = eve || window.event;
            that.move(e);
        }
        this.sBox.onmouseout = function() {
            that.out();
        }
    }
    over() {
        this.sSpan.style.display = "block";
        this.bBox.style.display = "block";
        this.cBox.style.display = "block";
    }
    move(e) {
        // 计算遮罩层跟随鼠标移动时的left和top
        var l = e.pageX - offset(this.sBox).l - this.sSpan.offsetWidth / 2;
        var t = e.pageY - offset(this.sBox).t - this.sSpan.offsetHeight / 2;
        // 边界限定
        if (l < 0) l = 0;
        if (t < 0) t = 0;
        if (l > this.sBox.offsetWidth - this.sSpan.offsetWidth) {
            l = this.sBox.offsetWidth - this.sSpan.offsetWidth;
        }
        if (t > this.sBox.offsetHeight - this.sSpan.offsetHeight) {
            t = this.sBox.offsetHeight - this.sSpan.offsetHeight;
        }
        // 设置遮罩层的位置
        this.sSpan.style.left = l + "px";
        this.sSpan.style.top = t + "px";
        // 根据遮罩层移动的距离计算比例
        var x = l / (this.sBox.offsetWidth - this.sSpan.offsetWidth);
        var y = t / (this.sBox.offsetHeight - this.sSpan.offsetHeight);
        // 根据上一步得到的比例，计算右侧大图要移动的当前值
        this.bImg.style.left = (this.bBox.offsetWidth - this.bImg.offsetWidth) * x + "px";
        this.bImg.style.top = (this.bBox.offsetHeight - this.bImg.offsetHeight) * y + "px";
    }
    out() {
        this.sSpan.style.display = "none";
        this.bBox.style.display = "none";
        this.cBox.style.display = "none";
    }
}

// 启动
var l = new Large();
l.addEvent();



function offset(ele) {
    var obj = {};
    obj.l = ele.offsetLeft;
    obj.t = ele.offsetTop;
    while (ele.offsetParent) { //寻找父级，当寻找到 body 往上的时候为 null ，所以循环停止
        ele = ele.offsetParent; //初始值
        obj.l += ele.offsetLeft
        obj.t += ele.offsetTop
    }
    return obj
}