let loc = location.href;
let n2 = loc.indexOf('=');
let id = loc.substring(n2 + 1, loc.length) //获取传过来的索引 


var urlParams = (/[^\d]/).test(id); //判断访问是否正确
if (urlParams) {
    var paramindex = layer.msg('非法访问！', {
        icon: 2,
    })
    setTimeout(() => {
        layer.close(paramindex)
        location.href = '../index.html';
        return false;
    }, 800)
}

var loadindex = layer.load(1, {
    shade: [0.5, '#333']
})

async function temp() {
    // 查询详情数据
    var res = await $.ajax({
        url: '../php/details.php',
        data: { id },
        dataType: 'json'
    })
    var { data } = res; //通过id查找返回的数据

    let img01 = data.img01;
    let img02 = data.img02;
    let introduce = data.introduce;
    let price = insertStr(data.price, 1, ',');

    $('.imgTagWrapper img').attr('src', img01); //第一张图片
    $('.detailImg img').attr('src', img02); //放大图片
    $('#productTitle').text(introduce); //文字
    $('.a-size-medium').text(`￥${price}`); //价格
    $('.a-size-base').text(`￥${price}`); //价格
    $('.celwidget').text(`￥${price}`); //价格
    $('.ags_local_price').text(`￥${price}`); //价格

    // enlarge()
    layer.close(loadindex);
}

temp()

// 为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
function insertStr(soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
}


// 加入购物车
$('.a-button-text').click(function() {
    // 判断是否登录
    var username = getCookie('username')
    if (!username) {
        var tipindex = layer.msg('请先登录！')
        setTimeout(function() {
            layer.close(tipindex)
            localStorage.setItem('url', location.href)
            location.href = 'login.html';
        }, 2000)
        return false;
    }

    // $('#nav-cart-count').text();
    // 判断本地存储中是否有数据
    var data = localStorage.getItem('data');
    var n = JSON.parse(data);
    console.log(n);
    if (data) {
        data = JSON.parse(data);
        // 判断数据中是否有当前这条数据
        var obj = data.filter(v => v.username === username && v.goodsid === id)
        if (obj.length) {
            // 如果本地存储中有当前这个商品的数据，就让数量增加
            obj[0].number = obj[0].number + ($('.quantity').find("option:selected").val() - 0);
        } else {
            // 如果没有当前这个商品的数据，就把当前这个商品的数据添加进去
            data.push({
                username,
                goodsid: id,
                number: $('.quantity').find("option:selected").val() - 0
            })
        }
        localStorage.setItem('data', JSON.stringify(data))
    } else {
        // 没有数据，就将当前这一条数据存储起来
        localStorage.setItem('data', JSON.stringify([{
            username,
            goodsid: id,
            number: $('.quantity').find("option:selected").val() - 0
        }]));
    }

    layer.msg('加入购物车成功', {
        icon: 1,
        time: 1000
    });
    // 购物车显示
    var data = localStorage.getItem('data');
    var arr = JSON.parse(data);
    var int = 0;
    console.log(arr)
    if (arr) { //判断购物车是否有数据
        for (var i = 0; i < arr.length; i++) {
            int += arr[i]['number'];
        }
        $('#nav-cart-count').text(int);
    }
})