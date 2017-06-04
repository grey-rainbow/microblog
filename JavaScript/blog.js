/**
 * Created by zenghui on 2017/5/29.
 */
var commentExpand = commentExpand || false;

function barExpanded() {
    var e = $("#blog-comment .comment-box")[0];
    e.style.width = commentExpand ? "0" : "350px";
    commentExpand = commentExpand ? false : true;
    var article = $("#blog-article");
    article[0].style.marginLeft = commentExpand ? "412px" : "216px";
}

function submitComments() {
    var comments = $("#comment-new .input-comments");
    $("#newcomment")[0].value = comments[0].innerHTML;
    var address = $("#comment-new .input-address");
    $("#contactaddress")[0].value = address[0].innerHTML;
    console.log(comments[0].innerHTML, address[0].innerHTML);
    $("#comment-new").submit();
}

$(document).ready(function () {
    var qs = window.location.search.length > 0 ? location.search.substring(1) : "",
        id = qs.split("=");
    (function () {
        $("#blog-article").load("./blog/" + id[1] + ".html");
    }());
});