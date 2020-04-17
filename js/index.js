window.onload = function () {


    slidingBlock();
    slideShow();




    ajax("get", "https://edu.telking.com/api/?type=month", "", function (res) {

        let arr = JSON.parse(res)
        // console.log(arr)
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementsByClassName('wrap_echarts')[0]);

        // 指定图表的配置项和数据
        option = {
            xAxis: {
                type: 'category',
                data: arr.data.xAxis
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                },
            },
            series: [{
                data: arr.data.series,
                type: 'line',
                areaStyle: {
                    color: "#c7d1ee"
                },
                smooth: 0.3,
                lineStyle: {
                    color: '#4486ef',
                    width: 3
                },
                itemStyle: {
                    normal: {
                        color: '#4486ef',
                        label: {
                            show: true,
                            color: '#4486ef',
                        }
                    }
                }
            }],
            title: {
                text: '曲线数据展示',
                x: 'center',

            },

        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    })

    ajax("get", "https://edu.telking.com/api/?type=week", "", function (res) {
        let arr = JSON.parse(res)
        console.log(arr.data)
        console.log(arr.data.xAxis)

        let myChart = echarts.init(document.getElementsByClassName('echarts_box1')[0]);
        let arr1 = [];
        let arr2 = [];

        for (let i of arr.data.series) {
            arr1.push({
                value: i,
            })
        }
        for (let j of arr.data.xAxis) {
            arr2.push({
                name: j
            })
        }

        let arr3 = []
        for (let i = 0; i < arr1.length; i++) {

            arr3[i] = Object.assign(arr1[i], arr2[i])
            console.log(arr3)
        }
        option = {
            title: {
                text: '饼状数据展示',
                left: 'center',
                top: "30px"
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: arr3,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    })

    ajax("get", "https://edu.telking.com/api/?type=week", "", function (res) {
        let myChart = echarts.init(document.getElementsByClassName('echarts_box2')[0]);
        let arr = JSON.parse(res)

        option = {
            title: {
                text: '柱状图数据展示',
                left: 'center',
                top: '30px'
            },
            color: ['#4486ef'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                containLabel: true,
                top:"100px"
            },
            xAxis: [{
                type: 'category',
                data: arr.data.xAxis,
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value',
                name:"商品数",
                nameTextStyle: {
                    padding: [0, 0, 0, -35]    // 四个数字分别为上右下左与原位置距离
                }
                
            }],
            series: [{
                name: '商品数',
                type: 'bar',
                barWidth: '50%',
                data: arr.data.series,
                center:[400,300]
            }]
        };
        myChart.setOption(option);
    })
}
// 滑块
function slidingBlock() {

    let headline = document.getElementsByClassName("headline_right")[0];
    let headline_ul = headline.getElementsByTagName("li")
    let mover = document.getElementsByClassName("mover")[0]
    console.log(mover)
    let n = 0
    for (let i = 0; i < headline_ul.length; i++) {
        headline_ul[i].index = i

        headline_ul[i].onmouseover = function () {
            let w = this.offsetWidth
            let l = this.offsetLeft
            // console.log(w, l)

            move(mover, "left", 5, l, w)
        }
        headline_ul[i].onclick = function () {
            for (let j = 0; j < headline_ul.length; j++) {
                headline_ul[j].className = ""

                if (j == headline_ul.length - 1) {
                    headline_ul[headline_ul.length - 1].className = "no_margin_right "
                }

            }
            this.className = "home"
            if (this.index == headline_ul.length - 1) {
                headline_ul[headline_ul.length - 1].className = "no_margin_right home"
            }
            n = this.index

        }
        headline_ul[i].onmouseout = function () {

            let w = headline_ul[n].offsetWidth;
            let l = headline_ul[n].offsetLeft
            move(mover, "left", 5, l, w)
        }
    }
}

// 轮播图
function slideShow() {
    // 轮播图数据
    imgArr = ["http://img1.qunarzz.com/piao/fusion/1801/1a/94428c6dea109402.jpg_640x200_2cf590d8.jpg", "http://img1.qunarzz.com/piao/fusion/1802/42/7c92b9a381e46402.jpg_640x200_1cdce2a4.jpg", "http://img1.qunarzz.com/piao/fusion/1802/51/e78f936a5b404102.jpg_640x200_c14f0b3a.jpg", "http://img1.qunarzz.com/piao/fusion/1712/91/a275569091681d02.jpg_640x200_0519ccb9.jpg"]

    let oWrapper = document.getElementById("wrapper");

    // 当前显示图片的索引
    let index = 0;

    let oList = document.getElementById("list");
    let nav = document.getElementById("navigator");
    let oSpans = nav.getElementsByTagName("span");

    let oPrev = document.getElementById("prev");
    let oNext = document.getElementById("next");
    oList.style.width = (imgArr.length + 1) * 536 + "px";

    // 图片列表结构
    let str1 = "";

    // 导航栏结构
    let str2 = "";

    for (let i = 0; i < imgArr.length; i++) {
        str1 += `<li><img src="${imgArr[i]}"></li>`
    }

    for (let j = 0; j < imgArr.length; j++) {
        str2 += `<span></span>`
    }

    str1 += `<li><img src="${imgArr[0]}"></li>`
    oList.innerHTML = str1
    nav.innerHTML = str2
    oSpans[0].classList = "active";

    let play = this.setInterval(autoPlay, 3000);

    oWrapper.onmouseover = function () {
        clearInterval(play)
    }
    oWrapper.onmouseout = function () {
        play = setInterval(autoPlay, 3000)
    }
    oNext.onclick = function () {
        autoPlay();
    }
    oPrev.onclick = function () {
        index -= 2;
        autoPlay();
    }

    // 点击导航栏
    for (let i = 0; i < imgArr.length; i++) {
        oSpans[i].index = i;
        oSpans[i].onclick = function () {
            index = this.index;
            index--;
            autoPlay();
        }
    }


    function autoPlay() {
        index++;

        if (index == imgArr.length + 1) {
            index = 1;
            oList.style.left = 0;
        }
        if (index == -1) {
            index = imgArr.length - 1;
        }
        for (let i = 0; i < imgArr.length; i++) {
            oSpans[i].className = "";
        }
        // 最后一张图片 对应第一张
        if (index == imgArr.length) {
            oSpans[0].className = "active";
        } else {
            oSpans[index].className = "active";
        }
        move(oList, "left", 30, index * (-536));
    }
}