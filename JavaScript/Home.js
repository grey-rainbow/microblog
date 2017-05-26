/**
 * Created by zenghui on 2017/5/21.
 */

window.onload = function () {
    var block = document.getElementsByClassName("timeLine-block");
    var content = document.getElementsByClassName("container");
    for (var i = 0; i < 10; i++)
        (function () {
            var flag = document.createElement("div");
            flag.setAttribute("class", "timeLine-block");
            flag.innerHTML = block[0].innerHTML;
            content[0].appendChild(flag);
        })();

    var image = $(".timeLine-content img");
    for (var index = 0; index < image.length; index++)
        image[index].getAttribute("data-src") && (image[index].src = image[index].getAttribute("data-src"));
};