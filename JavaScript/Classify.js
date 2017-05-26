/**
 * Created by zenghui on 2017/5/26.
 */

var showTag = "HTML&CSS";

function change_color(event) {
    var element;
    var elment_exhibition;
    showTag && (element = document.getElementById(showTag));
    showTag && (elment_exhibition = document.getElementById((showTag+"_exhibition")));
    element && element.setAttribute("class", "tag");
    elment_exhibition && elment_exhibition.setAttribute("style", "display:none");

    event.setAttribute("class", "tag_active");
    showTag =  event.id;
    showTag && (elment_exhibition = document.getElementById((showTag+"_exhibition")));
    elment_exhibition && elment_exhibition.setAttribute("style", "display:block");

    console.log(showTag);
}

window.onload = function () {
    var block = document.getElementsByClassName("exhibition_row");
    var content_HTML = document.getElementById("HTML&CSS_exhibition");
    for (var i = 0; i < 5; i++)
        (function () {
            var flag = document.createElement("div");
            flag.setAttribute("class", "exhibition_row");
            flag.innerHTML = block[0].innerHTML;
            content_HTML.appendChild(flag);
        })();

    var content_JavaScript = document.getElementById("JavaScript_exhibition");

    for (i = 0; i < 4; i++)
        (function () {
            var flag = document.createElement("div");
            flag.setAttribute("class", "exhibition_row");
            flag.innerHTML = block[0].innerHTML;
            content_JavaScript.appendChild(flag);
        })();

    var content_C = document.getElementById("C/C++_exhibition");

    for (i = 0; i < 4; i++)
        (function () {
            var flag = document.createElement("div");
            flag.setAttribute("class", "exhibition_row");
            flag.innerHTML = block[0].innerHTML;
            content_C.appendChild(flag);
        })();

    var content_Others = document.getElementById("Others_exhibition");

    for (i = 0; i < 4; i++)
        (function () {
            var flag = document.createElement("div");
            flag.setAttribute("class", "exhibition_row");
            flag.innerHTML = block[0].innerHTML;
            content_Others.appendChild(flag);
        })();

    var image = $(".box img");
    for (var index = 0; index < image.length; index++)
        image[index].getAttribute("data-src") && (image[index].src = image[index].getAttribute("data-src"));
};