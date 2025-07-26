const bgList =
    fetch('https://pixabay.com/api/?key=51491693-57776e4efd24b7178e2c384b3&orientation=horizontal&category=backgrounds')
        .then((response) => response.json())
        .then((json) => {
            return json.hits;
        });

console.log(bgList);
console.log(bgList[1]);
const l = JSON.parse('https://pixabay.com/api/?key=51491693-57776e4efd24b7178e2c384b3&orientation=horizontal&category=backgrounds');

console.log(l);