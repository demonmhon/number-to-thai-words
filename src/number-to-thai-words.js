const DIGIT_WORDS = [
  'ศูนย์',
  'หนึ่ง',
  'สอง',
  'สาม',
  'สี่',
  'ห้า',
  'หก',
  'เจ็ด',
  'แปด',
  'เก้า'
];
const DIGIT_UNIT_WORDS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
const DIGIT_CHUNK = 6;
const DIGIT_UNIT_CHUNK = DIGIT_UNIT_WORDS[DIGIT_CHUNK];
const CURRENCY_UNIT_WORD = 'บาท';
const CURRENCY_SUB_UNIT_WORD = 'สตางค์';
const CURRENCY_FULL_UNIT_WORD = 'ถ้วน';

function arrayChunk(arr, chunkSize) {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1];
    if (!last || last.length === chunkSize) {
      chunkedArr.push([arr[i]]);
    } else {
      last.push(arr[i]);
    }
  }
  return chunkedArr;
}

function parseToCurrency(number, precision = 2) {
  const numberFloatStr = parseFloat(number)
    .toString()
    .split('.');
  const integerUnitStr = numberFloatStr[0];
  const fractionalUnitStr =
    numberFloatStr.length === 2
      ? numberFloatStr[1].substring(0, precision)
      : '00';
  return parseFloat(`${integerUnitStr}.${fractionalUnitStr}`)
    .toFixed(precision);
}

function numberWords(number) {
  const parsedNumber = parseToCurrency(number)
  if (!isNaN(parsedNumber)) {
    const validNumber = parsedNumber.toString();
    const numberArr = validNumber.split('.');

    const readInteger = toWords(numberArr[0], CURRENCY_UNIT_WORD);
    const readDecimal =
      numberArr.length === 2 && numberArr[1] !== '00'
        ? toWords(numberArr[1], CURRENCY_SUB_UNIT_WORD)
        : '';

    const textOutput = [
      readInteger,
      readInteger.length && !readDecimal.length ? CURRENCY_FULL_UNIT_WORD : '',
      readDecimal
    ];

    return textOutput.join('');
  }

  return '';
}

function findDigitWord(number, digit, length) {
  let numberText = DIGIT_WORDS[number];
  switch (true) {
    case number === 0:
      numberText = '';
      break;

    case (number === 1 && length >= 2):
      if (digit === 0) {
        numberText = 'เอ็ด';
      }
      if (digit === 1) {
        numberText = '';
      }
      break;

    case (number === 2 && digit === 1):
      numberText = 'ยี่';
      break;
  }
  return numberText;
}

function toWords(number, unitWord) {
  const strNumberArr = parseFloat(number)
    .toString()
    .split('')
    .reverse();

  const textChunkArr = [];
  const numberChunk = arrayChunk(strNumberArr, DIGIT_CHUNK);

  numberChunk.forEach(chunk => {
    const textArr = [];
    const dLength = chunk.length;

    chunk.forEach((n, digit) => {
      const i = parseInt(n, 10);
      const numberText = findDigitWord(i, digit, dLength);
      const numberDigitText =
        i !== 0 && digit < dLength ? DIGIT_UNIT_WORDS[digit] : '';
      textArr.unshift(`${numberText}${numberDigitText}`);
    });

    textChunkArr.unshift(textArr.join(''));
  });

  const words = [textChunkArr.join(DIGIT_UNIT_CHUNK)];
  if (words[0] !== '') {
    words.push(unitWord);
  }

  return words.join('');
}

module.exports = numberWords;
