# Number to Thai Words

[![Maintainability](https://api.codeclimate.com/v1/badges/18a54a89e6c352e0ce3c/maintainability)](https://codeclimate.com/github/demonmhon/thai-number-words/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/18a54a89e6c352e0ce3c/test_coverage)](https://codeclimate.com/github/demonmhon/thai-number-words/test_coverage)

To output the Thai words from number.

```js
const thaiWords1 = words(100);
const thaiWords2 = words(100.25);

console.log(thaiWords1); // OUTPUT: หนึ่งร้อยบาทถ้วน
console.log(thaiWords2); // OUTPUT: หนึ่งร้อยบาทยี่สิบห้าสตางค์
```

Inspired by [antronic/thai-baht-text-js](https://github.com/antronic/thai-baht-text-js)
