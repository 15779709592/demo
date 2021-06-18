$(function() {
    // 判断用户是否登录 - 判断cookie中是否存有usernameh 
    var username = getCookie('username')
    var login = document.querySelector("#nav-tools .nav-line-1");
    if (username) {
        invalid(nav_link_yourAccount, nav_flyout_yourAccount) //隐藏登入功能
        fn(nav_link_yourAccount, nav_signin_tt); //显示退出功能
        $('#rhf-container').css('display', 'none'); //底部登入隐藏

        login.innerHTML = `您好，${username}`;

        // 购物车显示
        nav_cart_count();

        // 退出功能
        var logout = document.querySelector(".logout");
        logout.onclick = function() {
            layer.confirm('你确定要退出吗？', {
                    btn: ['确定', '取消'] //按钮
                },
                function() {
                    // 删除cookie
                    delCookie('username');
                    invalid(nav_link_yourAccount, nav_signin_tt) //隐藏退出功能
                    fn(nav_link_yourAccount, nav_flyout_yourAccount); //显示登入功能
                    $('#rhf-container').css('display', 'block'); //底部登入显示
                    var msgindex = layer.msg("退出成功", {
                        icon: 1
                    })
                    setTimeout(function() {
                        layer.close(msgindex)
                        location.href = '../index.html';
                    }, 2000)
                },
                function() {
                    layer.msg("已取消", {
                        icon: 1,
                        time: 500
                    })
                    return false;
                }
            );
        }
    } else {
        invalid(nav_link_yourAccount, nav_signin_tt) //隐藏退出功能
        fn(nav_link_yourAccount, nav_flyout_yourAccount); //显示登入功能
        $('#rhf-container').css('display', 'block'); //底部登入显示
        // 用户没有登录就让用户去登陆
        var msgindex = layer.msg("请先登录", {
            icon: 2,
        })
        setTimeout(function() {
            layer.close(msgindex)
            location.href = '../pages/login.html';
        }, 2000)
    }

    function nav_cart_count() {
        // 购物车数字显示
        var data = localStorage.getItem('data');
        var arr = JSON.parse(data);
        var n = 0;
        if (arr) { //判断购物车是否有数据
            for (var i = 0; i < arr.length; i++) {
                n += arr[i]['number'];
            }
            $('#nav-cart-count').text(n);
        }
    }

    // function fff() {
    // 请求购物车数据
    var data = localStorage.getItem('data');
    if (!data || JSON.parse(data).length == 0) {
        var str = `
        <div class="sc-your-amazon-cart-is-empty">
                <h2>您的亚马逊购物车为空</h2>
                <p>赶快去列表页挑选商品吧</p>
                <div class="sc-shop-todays-deals-link">
                    <a href="../pages/millet.html">进入商品页</a>
                </div>
        </div>`;
        $('.a-cardui-body').html(str);
        $('#proceed-to-checkout-desktop-container').css('display', 'none');
    } else {
        var arr = JSON.parse(data);
        if (!arr.length) {
            var str = `
            <div class="sc-your-amazon-cart-is-empty">
                <h2>您的亚马逊购物车为空</h2>
                <p>赶快去列表页挑选商品吧</p>
                <div class="sc-shop-todays-deals-link">
                    <a href="../pages/millet.html">进入商品页</a>
                </div>
            </div>`;
            $('.a-cardui-body').html(str);
            $('#proceed-to-checkout-desktop-container').css('display', 'none');
            return false;
        }
        // 从本地存储中获取到所有当前用户的数据
        var brr = arr.map(v => {
            if (v.username === username) {
                return v.goodsid
            }
        });

        // 将所有数据的商品id拼接在一起
        var ids = brr.join(',')
        var loadindex = layer.load(0, { shade: true });
        $.ajax({
            url: '../php/cart.php',
            data: { ids },
            dataType: "json",
            success(res) {
                var { data } = res;

                var str = '';
                for (var i = 0; i < data.length; i++) {
                    var number = arr.find(v => v.username === username && v.goodsid == data[i].id).number;
                    var price = insertStr(data[i].price, 1, ',');

                    str += `
                    <div class="sc-list-item-content index${i}">
                            <div class="a-fixed-left-grid-col">
                                <img src="${data[i].img01}">
                            </div>
                            <ul>
                                <li>${data[i].introduce}</li>
                                <li>现在有货</li>
                                <li><img src="../images/millet/11YSpdX38fL.jpg"></li>
                                <li>销售和发货商： 亚马逊德国</li>
                                <li>享免费配送</li>
                                <li>
                                    <select class='quantity' data-id='${data[i].id}'><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>
                                    <span class='remove'>删除</span>
                                </li>
                            </ul>
                            <span class="a-size-medium">¥${price}</span>
                    </div>`;
                    // $(`select option:contains('${number+1}')`).attr("selected", true);
                    // $("#sc-retail-cart-container select").val(number);
                }
                $('#proceed-to-checkout-desktop-container').css('display', 'block');
                $('.a-cardui-body').html(str);
                //设置每个的数量
                for (var i = 0; i < data.length; i++) {
                    var number = arr.find(v => v.username === username && v.goodsid == data[i].id).number;
                    $(`.index${i} select`).val(number);
                }

                layer.close(loadindex);
                // 全选单选事件
                // select();
                // 数量加减
                addAndReduce();
                // 移除
                remove();
                // 计算总数和总价
                total();
            }
        })
    }

    // 为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
    function insertStr(soure, start, newStr) {
        return soure.slice(0, start) + newStr + soure.slice(start);
    }

    // 计算总数和总价
    function total() {
        var totalNum = 0;
        var totalPrice = 0;
        var numbers;
        $('.sc-list-item-content').each(function(i, v) {
            totalNum += $(v).find('ul').find('li').eq(5).find('.quantity').find("option:selected").val() - 0;
            numbers = $(v).find('ul').find('li').eq(5).find('.quantity').find("option:selected").val() - 0;
            totalPrice += (($(v).find('.a-size-medium').text().replace('¥', '').replace(',', '') - 0) * numbers);
            // totalPrice = totalPrice.toFixed(2) - 0;
            console.log(totalNum);
            console.log(totalPrice);
        });
        // console.log(totalPrice)

        $('.totalNum').text(totalNum)
        $('.totalPrice').text(totalPrice);
        // 购物车数字显示
        nav_cart_count();
    }
    // 数量加减
    function addAndReduce() {
        console.log($('.quantity'))
        $('.quantity').click(function() {
            console.log(this)
            var num = $(this).find("option:selected").val() - 0;
            console.log(num);
            // 修改本地存储
            var data = JSON.parse(localStorage.getItem('data'))
            var goodsid = $(this).attr('data-id');
            var arr = data.find(v => v.username === username && v.goodsid === goodsid);
            console.log(arr);
            arr.number = num;
            localStorage.setItem('data', JSON.stringify(data));
            total()
        });
    }
    // 移除
    function remove() {
        $('.remove').click(function() {
            var that = $(this)
            layer.confirm('你确定要删除吗？', {
                    btn: ['确定', '取消'] //按钮
                },
                function() {
                    var data = JSON.parse(localStorage.getItem('data'))
                    console.log(that.parent())
                    var goodsid = that.siblings('.quantity').attr('data-id');
                    var index = data.findIndex(v => v.username === username && v.goodsid === goodsid);
                    console.log(data)
                    data.splice(index, 1)
                    that.parent().parent().parent().remove();
                    total();
                    localStorage.setItem('data', JSON.stringify(data))
                    layer.msg("删除成功", {
                        icon: 1,
                        time: 500
                    })
                    nav_cart_count()
                    data = JSON.parse(localStorage.getItem('data'));
                    // console.log(99)
                    // fff();
                    console.log(data.length)
                    if (!data.length) {
                        console.log(data.length)
                        var str = `
                            <div class="sc-your-amazon-cart-is-empty">
                                    <h2>您的亚马逊购物车为空</h2>
                                    <p>赶快去列表页挑选商品吧</p>
                                    <div class="sc-shop-todays-deals-link">
                                        <a href="../pages/millet.html">进入商品页</a>
                                    </div>
                            </div>`;
                        $('.a-cardui-body').html(str);
                        $('#proceed-to-checkout-desktop-container').css('display', 'none');
                    }
                },
                function() {
                    layer.msg("已取消", {
                        icon: 1,
                        time: 500
                    })
                    return false;
                }
            );
        })
    }
})