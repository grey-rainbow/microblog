/**
 * Created by zenghui on 2017/5/29.
 */

var isExpand = isExpand || false;

function expanded() {
    var e = $(".select-bar")[0];
    e.style.display = isExpand ? "none" : "block";
    isExpand = isExpand ? false : true;
}

function showCollections() {

    expanded();

}