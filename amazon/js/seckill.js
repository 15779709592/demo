function count_down(time1, time2) {
    var time1 = time1.getTime();
    var time2 = time2.getTime();
    var cha = parseInt((time2 - time1) / 1000);
    //计算天
    var day = parseInt(cha / (60 * 60 * 24));
    //计算小时
    var hours = cha % (60 * 60 * 24);
    hours = parseInt(hours / (60 * 60));
    //计算分钟
    var minutes = cha % (60 * 60);
    minutes = parseInt(minutes / 60);
    //计算秒
    var seconds = cha % 60;
    // return day + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
    return `距开始：${hours}:${minutes}:${seconds}`;
}

var time1 = new Date();
var time2 = new Date('2021-06-19 21:00:00');
var str = count_down(time1, time2);

let seckill = document.querySelector('#seckill');
seckill.innerText = str;

setInterval(function() {
    var time1 = new Date();
    var str = count_down(time1, time2);
    seckill.innerText = str;
}, 1000);