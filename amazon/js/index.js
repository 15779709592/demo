let nav_link_shopall = document.querySelector('#nav-link-shopall'); //获取全部商品分类元素
let nav_flyout_shopAll = document.querySelector('#nav-flyout-shopAll'); //获取隐藏的商品分类元素
nav_link_shopall.addEventListener('mouseenter', function() {
    nav_flyout_shopAll.style.display = 'block';
    nav_link_shopall.style.border = '1px solid #ccc';
})
nav_link_shopall.addEventListener('mouseleave', function() {
    nav_flyout_shopAll.style.display = 'none';
    nav_link_shopall.style.border = '1px solid rgba(255,0,0,0)';
})
nav_flyout_shopAll.addEventListener('mouseenter', function() {
    nav_flyout_shopAll.style.display = 'block';
})
nav_flyout_shopAll.addEventListener('mouseleave', function() {
    nav_flyout_shopAll.style.display = 'none';
})


//获取侧边栏的span标签
let nav_hasPanel = document.querySelectorAll("#nav-flyout-shopAll>.nav-template>.nav-hasPanel");
//获取对应的侧边栏子内容
let nav_template = document.querySelectorAll("#nav-flyout-shopAll>.nav-subcats>.nav-template");


for (let i = 0; i < nav_hasPanel.length; i++) {
    nav_hasPanel[i].addEventListener('mouseover', function() {
        for (var j = 0; j < nav_template.length; j++) {
            nav_template[j].style.display = 'none';
        }
        nav_template[i].style.display = 'block';
    })
}

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


function fn(ele1, ele2) {
    ele1.addEventListener('mouseenter', function(e) {
        ele2.style.display = 'block';
        ele1.style.border = '1px solid #ccc';
        e = e || window.event;
        // let left = e.pageX;
        let left = offset(ele1).l;
        ele2.style.left = left + 'px';
    })
    ele1.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
        ele1.style.border = '1px solid rgba(255,0,0,0)';
    })
    ele2.addEventListener('mouseenter', function() {
        ele2.style.display = 'block';
    })
    ele2.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
    })
}

function invalid(ele1, ele2) {
    ele1.addEventListener('mouseenter', function(e) {
        ele2.style.display = 'none';
        ele1.style.border = '1px solid #ccc';
        e = e || window.event;
        // let left = e.pageX;
        let left = offset(ele1).l;
        ele2.style.left = left + 'px';
    })
    ele1.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
        ele1.style.border = '1px solid rgba(255,0,0,0)';
    })
    ele2.addEventListener('mouseenter', function() {
        ele2.style.display = 'none';
    })
    ele2.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
    })
}

let nav_link_yourAccount = document.querySelector('#nav-link-yourAccount'); //登入
let nav_flyout_yourAccount = document.querySelector('#nav-flyout-yourAccount');
let nav_signin_tt = document.querySelector('.nav-signin-tt');
// fn(nav_link_yourAccount, nav_flyout_yourAccount);  //登入按钮弹出
// fn(nav_link_yourAccount, nav_signin_tt); //弹出按钮

invalid(nav_link_yourAccount, nav_flyout_yourAccount)
invalid(nav_link_yourAccount, nav_signin_tt)


function fn1(ele1, ele2, n) {
    ele1.addEventListener('mouseenter', function(e) {
        ele2.style.display = 'block';
        ele1.style.border = '1px solid #ccc';
        e = e || window.event;
        // let left = e.pageX;
        let left = offset(ele1).l;
        ele2.style.left = left - n + 'px';
    })
    ele1.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
        ele1.style.border = '1px solid rgba(255,0,0,0)';
    })
    ele2.addEventListener('mouseenter', function() {
        ele2.style.display = 'block';
    })
    ele2.addEventListener('mouseleave', function() {
        ele2.style.display = 'none';
    })
}
let nav_link_prime = document.querySelector('#nav-link-prime');
let nav_flyout_prime = document.querySelector('#nav-flyout-prime');
fn1(nav_link_prime, nav_flyout_prime, 52)

let nav_link_wishlist = document.querySelector('#nav-link-wishlist');
let nav_flyout_wishlist = document.querySelector('#nav-flyout-wishlist');
fn1(nav_link_wishlist, nav_flyout_wishlist, 157)



function Scroll_bar_move() {
    var oAll = document.querySelector('.feed-scrollbar-thumb');
    var oDiv1 = document.querySelector('.feed-scrollbar');
    var oDiv2 = document.querySelector('.a-unordered-list');
    var startX;
    var moveX;
    var oDiv1W = oDiv1.clientWidth;

    oAll.addEventListener("mousedown", function(e) {
        e = e || window.event;
        startX = e.clientX - this.offsetLeft;
        this.addEventListener('mousemove', mou);
        // this.addEventListener('mouseup', up);
    });

    oDiv2.addEventListener('selectstart', function(e) {
        e = e || window.event;
        e.preventDefault();
    })

    function mou(e) {
        moveX = e.clientX - startX;
        if (moveX < 0) {
            moveX = 0;
        }
        if (moveX + this.clientWidth > oDiv1W) {
            moveX = oDiv1W - this.clientWidth;
        }
        this.style.left = moveX + 'px';
        oDiv2.style.left = -(moveX) * 2.3 + 'px';
    }

    document.addEventListener('mouseup', function() {
        oAll.removeEventListener('mousemove', mou);
    })

    var roll = document.querySelector('.roll');

    roll.addEventListener('mouseenter', function() {
        oAll.style.display = 'block';
    })
    roll.addEventListener('mouseleave', function() {
        oAll.style.display = 'none';
    })

}


let inp = document.querySelector('#twotabsearchtextbox'); //表单输入提示
let oul = document.querySelector('.nav-flyout-anchor .ul');

oul.style.width = inp.scrollWidth + 'px';
inp.addEventListener("input", function() {
    oul.style.left = offset(inp).l + 'px';
    oul.style.width = inp.scrollWidth + 'px';
    oul.style.display = 'block';

    let value = this.value;
    let script = document.createElement('script');
    script.className = 'jsonp';
    let scriptAll = document.querySelectorAll('script');

    scriptAll.forEach(item => {
        if (item.className === "jsonp") {
            script = item;
        }
    })
    script.src = `https://suggest.taobao.com/sug?code=utf-8&q=${value}&extras=1&area=c2c&bucketid=atb_search&pid=mm_26632258_3504122_32538762&unid=&clk1=81cf83adc4f88066e182d0ab2bb2f5cd&_=1623406879751&callback=fn`;
    window.fn = function(res) {
        let str = '';
        if (res.result) {
            res.result.forEach(time => {
                str += `<li><a href="javascript:;">${time[0]}</a></li>`;
            });
            oul.innerHTML = str;
            document.body.removeChild(script);
        }
    }
    document.body.appendChild(script);
})

inp.addEventListener('blur', function() {
    oul.style.display = 'none';
})


function Back_to_top() {
    var top1 = document.getElementsByClassName('av-belt')[0];
    var botton1 = document.querySelector("#fixedtool");

    window.onscroll = function() {
        var oTop = document.documentElement.scrollTop;
        if (oTop >= 300) {
            botton1.style.opacity = '1';
        } else {
            botton1.style.opacity = '0';
        }
    }

    botton1.onclick = function() {
        var set = setInterval(function() {
            document.documentElement.scrollTop -= 50;
            var s = document.documentElement.scrollTop;
            if (s == 0) {
                clearTimeout(set);
            }
        }, 10);
    }
}