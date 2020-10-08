var data = JSON.parse(localStorage.getItem('KCGTravel')) || [];
var zonename = JSON.parse(localStorage.getItem('Zonename')) || [];
var countarea = [];

getdata();

// fetch資料
function getdata() {
    fetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', {})
        .then((response) => {
            return response.json();
        }).then((print) => {
            console.log(print);
            if (data.length == 0) {
                for (let i = 0; i < print.result.records.length; i++) {
                    let localstorageinfo = {
                        Pictureurl: print.result.records[i].Picture1,
                        Name: print.result.records[i].Name,
                        Zone: print.result.records[i].Zone,
                        Opentime: print.result.records[i].Opentime,
                        Add: print.result.records[i].Add,
                        Tel: print.result.records[i].Tel,
                        Ticketinfo: print.result.records[i].Ticketinfo
                    };

                    data.push(localstorageinfo);
                }
                localStorage.setItem('KCGTravel', JSON.stringify(data));

                let zonearr = []
                for (let i = 0; i < print.result.records.length; i++) {
                    zonearr.push(print.result.records[i].Zone);
                }
                zonename = [...new Set(zonearr)];
                localStorage.setItem('Zonename', JSON.stringify(zonename));

            } else {
                return;
            }

        }).then(() => {
            selectlist();
            areaset();
        }).then(() => {


        }).catch((error) => {
            console.log('錯誤', error);
        });
}
// 資訊放進選單裡
function selectlist() {
    // 這邊順序不能改   要先有產生東西才能放進去
    var selectarea = '';
    // for (let i = 0; i < data.length; i++) {
    //     selectarea += `<option value="${data[i].Zone}" class=""> ${data[i].Zone} </option>`
    // }
    for (let i = 0; i < zonename.length; i++) {
        selectarea += `<option value="${zonename[i]}" class=""> ${zonename[i]} </option>`;
    }
    var select = document.querySelector('.header-select');
    select.innerHTML = `
    <select name="KCGtravel" id="KCGtravel" >
        <option value="" class="">--請選擇行政區--</option>
        ${selectarea}
    </select>
`;
}
// 設定顯示地區的字
var count = {};

function areaset() {
    // 讓AREA顯示選單選到的地點
    var selected = document.getElementById('KCGtravel');

    selected.addEventListener('change', (e) => {
        var index = selected.selectedIndex;
        var area = document.querySelector('.area');
        area.innerHTML = `<span>${selected.options[index].value}</span>`;

        var items = document.querySelector('.items');
        var item = '';
        for (let i = 0; i < data.length; i++) {
            if (selected.options[index].value == data[i].Zone) {

                item += ` <div class="item">
                                <div class="item-top" style="background:url(${data[i].Pictureurl}) no-repeat; background-size:464px 155px">
                                    <p>
                                        <span>${data[i].Name}</span>
                                        <span>${data[i].Zone}</span>
                                    </p>
                                </div>
                                <div class="item-bottom">
                                    <p class="location-info business-hours">
                                        <img src="/BEGINER_HW/assets/icons_clock.png" alt="" class="">
                                        <span class="">${data[i].Opentime}</span>
                                    </p>
                                    <p class="location-info location">
                                        <img src="/BEGINER_HW/assets/icons_pin.png" alt="" class="">
                                        <span class="">${data[i].Add}</span>
                                    </p>
                                    <p class="location-info address">
                                        <img src="/BEGINER_HW/assets/icons_phone.png" alt="" class="">
                                        <span class="">${data[i].Tel}</span>
                                    </p>
                                    <p class="location-info fee">
                                        <img src="/BEGINER_HW/assets/icons_tag.png" alt="" class="">
                                        <span class="">${data[i].Ticketinfo}</span>
                                    </p>
                                </div>
                            </div>
                            `

            }
        }

        if (Object.keys(count).length == 0) {
            zonename.forEach((item) => {
                count[item] = 0;
            })
        }

        for (let i = 0; i < zonename.length; i++) {
            if (selected.options[index].value == zonename[i]) {
                count[zonename[i]] += 1;
            }
        }

        var countkeys = Object.keys(count);
        var countvalue = Object.values(count);
        // 對count的KEY和VALUE排序
        function bobsort(a,b) {
            for(let j=0;j<a.length;j++){
            for (let i = 0; i < a.length; i++) {
                if (a[i] > a[i + 1]) {
                    [a[i], a[i + 1]] = [a[i + 1], a[i]];
                    [b[i], b[i + 1]] = [b[i + 1], b[i]];
                }
            }}
            return [a,b];
        }
        // 把排序後的資料顯示在畫面上
        function populararea() { 
            let getbobsort = bobsort(countvalue,countkeys);
            let district_box = document.querySelector('.district-box');
            district_box.innerHTML = `
            <p class="the-most-popular first-pop">${getbobsort[1][getbobsort[1].length-1]}</p>
            <p class="the-most-popular sec-pop">${getbobsort[1][getbobsort[1].length-2]}</p>
            <p class="the-most-popular third-pop">${getbobsort[1][getbobsort[1].length-3]}</p>
            <p class="the-most-popular four-pop">${getbobsort[1][getbobsort[1].length-4]}</p>
            `;
         }
        populararea();
        items.innerHTML = item;
    }, false);

}