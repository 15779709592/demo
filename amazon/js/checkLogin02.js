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
        var data = localStorage.getItem('data');
        var arr = JSON.parse(data);
        var n = 0;
        console.log(arr)
        if (arr) { //判断购物车是否有数据
            for (var i = 0; i < arr.length; i++) {
                n += arr[i]['number'];
            }
            $('#nav-cart-count').text(n);
        }

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
    }

})