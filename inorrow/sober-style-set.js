import './sober/dist/sober.min.js';
import './sober-theme/dist/sober-theme.min.js';

const img = new Image();
img.src = document.getElementById('main').style.backgroundImage;
img.crossOrigin = 'anonymous';
console.log(img.src);
sober.theme.createScheme(img, { page: document.querySelector('s-page') });