import './sober/dist/sober.min.js';
import './sober-theme/dist/sober-theme.min.js';
/*
const img = new Image();
img.src = document.getElementById('main').style.backgroundImage;
img.crossOrigin = 'anonymous';
console.log(img.src);
sober.theme.createScheme(img, { page: document.querySelector('s-page') });*/

const bgList =
    fetch('https://bing.biturl.top/?resolution=1366&format=image&index=0&mkt=zh-CN');

let clock = document.getElementById('time');

console.log(bgList);

bgList
    .then(result => result.url)
    .then(url => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        console.log(img.src);
        sober.theme.createScheme(img, { page: document.querySelector('s-page') });
    })
const l = bgList.then(result => { return result });
