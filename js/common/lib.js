function getStyle(el, attr) {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el)[attr];
    }
}
// 预设置全局变量 保存定时器
var timer;
/* el   元素obj
attr 属性名string
step 步长  number
target  目标值 number 
mover 目标宽度 number
*/

function move(el, attr, step, target,mover) {
    clearInterval(timer);
    step = parseInt(getStyle(el, attr)) < target ? step : -step;
    timer = setInterval(function () {
        var nowValue = parseInt(getStyle(el, attr));
        var newValue = nowValue + step;
        if ((step > 0 && newValue > target) || (step < 0 && newValue < target)) {
            newValue = target;
            clearInterval(timer);
        }
        el.style[attr] = newValue + "px";
        el.style.width = mover +"px"
    }, 20);
}

/*
    method:请求方式
    url:地址
    data:参数
    cb:请求成功执行的回调函数
        res: 返回的字符串

*/
function ajax(method, url, data, cb) {
    var xhr = new XMLHttpRequest();
    method = method.toUpperCase();
    if (method == "GET") {
        if (data) {
            url = url + "?" + data;
        }
        xhr.open("GET", url);
        xhr.send();
    } else if (method == "POST") {
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText);
            cb(xhr.responseText);
        }
    }
}