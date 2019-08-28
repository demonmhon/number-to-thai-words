const _ = require('lodash');

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
  'เก้า',
  'สิบ'
];
const DIGIT_UNIT_WORDS = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
const DIGIT_UNIT_CHUNK = DIGIT_UNIT_WORDS[6];
const DIGIT_CHUNK = 6;
const CURRENCY_UNIT_WORD = 'บาท';
const CURRENCY_SUB_UNIT_WORD = 'สตางค์';
const CURRENT_FULL_UNIT_WORD = 'ถ้วน';

function parseToCurrency(number, precision = 2) {
  const numberFloatStr = parseFloat(number)
    .toString()
    .split('.');
  const integerUnitStr = numberFloatStr[0];
  const fractionalUnitStr =
    numberFloatStr.length == 2
      ? numberFloatStr[1].substring(0, precision)
      : '00';
  return parseFloat(`${integerUnitStr}.${fractionalUnitStr}`)
    .toFixed(precision)
}

function numberWords(number) {

  const validNumber = parseToCurrency(number).toString()
  const numberArr = validNumber.split('.');

  const readInteger = toWords(numberArr[0]);
  const readDecimal =
    numberArr.length === 2 && numberArr[1] !== '00'
      ? toWords(numberArr[1])
      : '';

  const textOutput = [];
  if (readInteger.length) {
    textOutput.push(`${[readInteger, CURRENCY_UNIT_WORD].join('')}`);
  }
  if (textOutput.length && !readDecimal.length) {
    textOutput.push(CURRENT_FULL_UNIT_WORD);
  }
  if (readDecimal.length) {
    textOutput.push(`${[readDecimal, CURRENCY_SUB_UNIT_WORD].join('')}`);
  }

  return textOutput.join('');
}

function toWords(number) {
  const strNumberArr = parseFloat(number)
    .toString()
    .split('')
    .reverse();

  const textChunkArr = [];
  const numberChunk = _.chunk(strNumberArr, DIGIT_CHUNK);

  numberChunk.forEach(chunk => {
    const textArr = [];
    const dLength = chunk.length;

    chunk.forEach((n, digit) => {
      const i = parseInt(n, 10);
      let numberText = (i !== 0 && digit < dLength) ? DIGIT_WORDS[i] : '';
      if (i === 1) {
        if (dLength >= 2 && digit === 0) {
          numberText = 'เอ็ด'
        }
        if (dLength >= 2 && digit === 1) {
          numberText = ''
        }
      }
      if (i === 2 && digit === 1) {
        numberText = 'ยี่'
      }
      const numberDigitText = (i !== 0 && digit < dLength) ? DIGIT_UNIT_WORDS[digit] : '';
      textArr.unshift(`${numberText}${numberDigitText}`);
    });

    textChunkArr.unshift(textArr.join(''));
  });

  return textChunkArr.join(DIGIT_UNIT_CHUNK);
}

module.exports = numberWords;
