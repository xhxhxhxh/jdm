window.onload=function () {
    document.querySelector('.jd_banner').addEventListener('touchmove',function (e) {
        e.preventDefault();
    });

    searchColor();
    bannerChange();
    timeDown();

};

//搜索栏颜色渐变
function searchColor() {
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var bannerHeight = banner.offsetHeight;
    var opacity = 0;
    //屏幕上下滑动事件
    window.onscroll = function () {
        // console.log(document.body.scrollTop);
        // console.log(document.documentElement.scrollTop);
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        // console.log(scrollTop);
        if (scrollTop < bannerHeight) {
            opacity = scrollTop/bannerHeight * 0.85;
        } else {
            opacity = 0.85;
        }
        search.style.backgroundColor = 'rgba(201,21,35,'+opacity+')';
    }
}

//轮播图切换
function bannerChange() {
    var banner = document.querySelector('.jd_banner');
    var bannerWidth = banner.offsetWidth;
    //图片对象
    var images = banner.querySelector('ul:first-child');
    //图底部圆点对象
    var dotsList = banner.querySelector('ul:last-child');
    var dots = dotsList.querySelectorAll('li');
    var index = 1;

    //添加过渡效果
    var addTranstion = function () {
        images.style.transition = 'transform 0.4s';
        images.style.webkitTransition = 'transform 0.4s';
    };
    //移除过渡
    var removeTranstion = function () {
        images.style.transition = 'none';
        images.style.webkitTransition = 'none';
    };
    //设置位移距离
    var setTranslateX = function (translateX) {
        images.style.transform = 'translateX('+translateX+'px)';
        images.style.webkitTransform = 'translateX('+translateX+'px)';
    };

    //banner自动切换
    var timer  = setInterval(function () {
        index++;
        addTranstion();
        setTranslateX(-index*bannerWidth);
    },1000);

    //最后一张图时
    images.addEventListener('transitionend',function () {
        if (index >= 9) {
            index = 1;
            removeTranstion();
            setTranslateX(-index*bannerWidth);
        }
        if (index <= 0) {
            index = 8;
            removeTranstion();
            setTranslateX(-index*bannerWidth);
        }
        //点的位置变化
        for (var i=0;i<dots.length;i++) {
            dots[i].classList.remove('now');
        }
        dots[index-1].classList.add('now');
    });

    //触摸事件
    var startX = 0;
    var distance = 0;
    var ismove = false;
    images.addEventListener('touchstart',function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    images.addEventListener('touchmove',function (e) {
        var endX = e.touches[0].clientX;
        distance = endX-startX;
        ismove = true;
        removeTranstion();
        setTranslateX(-index*bannerWidth+distance);
    });
    images.addEventListener('touchend',function (e) {
        if (ismove) {
            if (Math.abs(distance) < bannerWidth/3) {
                addTranstion();
                setTranslateX(-index*bannerWidth);
            } else {
                if (distance >= 0) {
                    index--;
                } else {
                    index++;
                }
                addTranstion();
                setTranslateX(-index*bannerWidth);
            }
            startX = 0;
            distance = 0;
            ismove = false;
        }
        timer  = setInterval(function () {
            index++;
            addTranstion();
            setTranslateX(-index*bannerWidth);
        },1000);
    });
}

//倒计时
var timeDown = function () {
    var time = 2*60*60;
    var spans = document.querySelectorAll('.time span');
    var timeChange = setInterval(function () {
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000);
    if (time <= 0) {
        clearInterval(timeChange);
    }
};