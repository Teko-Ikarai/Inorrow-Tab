/*

const bgList =
    fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')

console.log(bgList);

bgList
    .then(result => result.webformatURL)
    .then(url => {
        document.getElementById("main").style.backgroundImage = "url(" + url + ")";
    })
const l = bgList.then(result => {return result});

console.log(l);*/

const _Date_ = new Date();

let date = document.getElementById('date');
let time = document.getElementById('time');
let searchBar = document.getElementById('search-bar');

date.innerHTML =
    _Date_.toLocaleString('en-UK', { 'month': 'short' }) + ' / ' + _Date_.getDate();

time.innerHTML =
    _Date_.toLocaleTimeString('en-UK', {
        'hour': '2-digit',
        'minute': '2-digit'
    })

setInterval(() => {
    let timeNow = new Date();
    time.innerHTML =
        _Date_.toLocaleTimeString('en-UK', {
            'hour': '2-digit',
            'minute': '2-digit'
        })
}, 10000);

searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        window.location.href = 'https://www.bing.com/search?q=' + searchBar.value;
    }
})