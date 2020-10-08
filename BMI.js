// 按下按鈕時要去計算BMI
var btn = document.getElementById('watch-result');
var new_btn = document.querySelector('.new-btn');
var layout = document.getElementById('layout');
var arr = JSON.parse(localStorage.getItem('BMIdata')) || [];
btn.addEventListener('click', save_data, false);
// BMI計算公式的函式
function BMI() {
    var height = document.getElementById('height');
    var weight = document.getElementById('weight');
    var current_height = function () {
        // if (height.value.match(/\d/) == true) {
        if (height.value != '' && (height.value.match(/\d*/)[0]) != '' )  {
            return height.value;
        } else {
            return Number(0);
        }
    }
    var current_weight = function () {
        // if (weight.value.match(/\d/) != true) {
        if (weight.value != '' && (weight.value.match(/\d*/)[0]) != '') {
            return weight.value;
        } else {
            return Number(0);
        }
    }
    var height_meter = Number(current_height()) / 100;
    var bmi = function () {
        var bmi = Number(current_weight()) / (height_meter * height_meter);
        if (isNaN(bmi)) {
            return '未知';
        } else if(bmi == Infinity){
            return '無限大';
        } else {
            return bmi.toFixed(2);
        }
    }
    return [bmi(), current_weight(), current_height()];
}
// 顯示資料在畫面上
function print_data() {
    // 判斷BMI程度
    var status = function () {
        if (BMI()[0] < 18.5) {
            return ['過輕', '#31BAF9'];
        } else if (BMI()[0] < 24) {
            return ['理想', '#86D73F'];
        } else if (BMI()[0] < 27) {
            return ['過重', '#FF982D'];
        } else if (BMI()[0] < 30) {
            return ['輕度肥胖', '#FF6C03'];
        } else if (BMI()[0] < 35) {
            return ['中度肥胖', '#FF6C03'];
        } else if (BMI()[0] >= 35) {
            return ['過度肥胖', '#FF1200'];
        } else {
            return ['輸入錯誤', '#fff'];
        }
    }

    var date = new Date();
    var getyear = date.getFullYear();
    var getmonth = function () {
        if ((date.getMonth() + 1) < 10) {
            return '0' + (date.getMonth() + 1);
        } else {
            return date.getMonth() + 1;
        }
    };
    var getdate = date.getDate();
    return [status(), `${getdate}-${getmonth()}-${getyear}`];
}
// 按鈕變換
function btn_change() {
    btn.style.display = 'none';
    new_btn.innerHTML = `
    <div class="createcircle">
        <div class="circle" style="border: 6px solid ${arr[arr.length-1].color}">
            <p class="">
                <span class="" style="color:${arr[arr.length-1].color}">${arr[arr.length-1].BMI}</span>
                <span class="" style="color:${arr[arr.length-1].color}">BMI</span>
            </p>
            <div style="background:${arr[arr.length-1].color}">
                <img src="/BEGINER_HW/assets/icons_loop.png" alt="" class="circle-img" >
            </div>
        </div>
    <p class="circle-status" style="color:${arr[arr.length-1].color}">${arr[arr.length-1].status}</p>
    </div>
    `
}
// 存進localstorage
function save_data() {
    var BMIobj = {
        status: print_data()[0][0],
        color: print_data()[0][1],
        BMI: BMI()[0],
        weight: BMI()[1],
        height: BMI()[2],
        date: print_data()[1]
    };
    arr.push(BMIobj);
    localStorage.setItem('BMIdata', JSON.stringify(arr));
    update();
    btn_change();
}
// 更新畫面
function update() {
    var bmiword = `
        <div class="bmi-record layout">
            <span>BMI紀錄</span>
        </div>
    `;
    var createmodel = '';
    for (let i = 0; i < arr.length; i++) {
        createmodel += `
        <div class="all-info layout">
            <div class="all-info-color"style="background:${arr[arr.length-(1+i)].color}"></div>
            <div class="all-info-detail ">
                <span class="layout-status">${arr[arr.length-(1+i)].status}</span>
                <span class="layout-BMI"><span class="bmi-font-size">BMI </span> ${arr[arr.length-(1+i)].BMI}</span>
                <span class="layout-weight"><span class="weight-font-size">weight </span>${arr[arr.length-(1+i)].weight}kg</span>
                <span class="layout-height"><span class="height-font-size">height </span>${arr[arr.length-(1+i)].height}cm</span>
                <span class="layout-date"><span class="date-font-size">${arr[arr.length-(1+i)].date}</span></span>
            </div>
        </div>
        `;
    }
    layout.innerHTML = bmiword + createmodel;
}