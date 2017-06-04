/**
 * Created by zenghui on 2017/5/21.
 */

window.onload = function () {

    var timeLine = $(".blog")[0];

    // 用于加载时发送请求参数，表示第几屏内容，初始为1，以后每请求一次，递增1
    var page = 0;
    // 只缓存最新一次下拉数据生成的DOM节点，即需要插入的dom缓存数组
    var slideCache = [];
    // 用于已经生成的DOM节点储存，存有item的offsetTop，offsetHeight
    var slideMap = {};
    // pageYOffset设置或返回当前页面相对于窗口显示区左上角的Y位置。
    var lastScrollY = timeLine.scrollTop;
    var scrollY = timeLine.scrollTop;
    // 浏览器窗口的视口（viewport）高度
    var innerHeight;
    // isVisible的上下阈值边界
    var topViewPort;
    var bottomViewPort;

    var fetching = false;

    function getData() {
        if (fetching)
            return;
        else
            fetching = true;
        $.ajax({
            url: "./data/blog.json",
            type: "GET",
            async: true,
            dataType: "json",
            success: function (data) {

                var block = $(".timeLine-block")[0];
                var content = $(".container")[0];
                var temp, index;
                for (var i = 0; i < data["blog"].length; i++) {
                    (function () {
                        var flag = document.createElement("div");
                        flag.setAttribute("class", "timeLine-block");
                        flag.innerHTML = block.innerHTML;
                        index = flag.children[0];
                        temp = data["blog"][i];

                        index.children[0].href += ("?id=" + temp["NO"]);
                        index.children[1].innerHTML = temp["time"];
                        index.children[2].setAttribute("data-src", temp["img"]);
                        index.children[3].innerHTML = temp["title"];
                        index.children[4].innerHTML = temp["article"];

                        content.appendChild(flag);

                        updateItemCache(flag, i);
                    }());
                }
                fetching = false;
                page++;
                handleScroll(null, true);
                console.log("Got data");
            },
            error: function (xhr, textStatus) {
                console.log("Error!");
                console.log(xhr);
                console.log(textStatus);
            }
        })
    }

    function updateItemCache(node, pos) {
        slideCache[pos] = {
            id: (pos + page * 6 + 1),
            node: node,
            img: node.querySelector("img")
        };
        slideCache[pos].src = slideCache[pos].img.getAttribute("data-src");

        slideMap[(slideCache[pos].id)] = {
            node: node,
            height: node.offsetHeight,
            offTop: node.offsetTop
        }
    }

    function handleScroll(e, force) {
        if (!force && lastScrollY == timeLine.scrollTop) {
            window.setTimeout(handleScroll, 100);
            return;
        }
        else {
            lastScrollY = timeLine.scrollTop;
        }
        scrollY = timeLine.scrollTop;
        innerHeight = timeLine.offsetHeight;
        topViewPort = scrollY - 1000;
        bottomViewPort = scrollY + innerHeight + 600;

        if (timeLine.scrollTop + innerHeight + 200 > timeLine.scrollHeight) {
            getData();
        }

        handleDefer();
        window.setTimeout(handleScroll, 100);
    }
    
    function handleDefer() {
        var list = slideCache;
        var thisimg;
        var deferSrc;
        for (var i = 0; i < list.length; i++) {
            thisimg = list[i].img;
            deferSrc = list[i].src;
            if (isVisible(list[i].id)) {
                var handle = function () {
                    var node = thisimg;
                    var src = deferSrc;
                    return function () {
                        node.src = src;
                        node.style.opacity = 1;
                    };
                };
                var img = new Image();
                img.onload = handle();
                img.src = list[i].src;
            }
        }
    }

    function isVisible(id) {
        var offTop = slideMap[id].offTop;
        var offsetHeight = slideMap[id].height;
        if (offTop + offsetHeight > topViewPort && offTop < bottomViewPort)
            return true;
        else
            return false;
    }

    window.setTimeout(handleScroll, 100);
    getData();

    $(".blog").on("click","img", function (e) {
        var target = e.target;
        if (target.src == "data:image/gif;base64,R0lGODdhAQABAPAAAP%2F%2F%2FwAAACwAAAAAAQABAEACAkQBADs%3D") {
            target.src = target.getAttribute("data-src");
            target.style.opacity = 1;
        }
    })
};