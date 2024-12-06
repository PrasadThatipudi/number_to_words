function getDigitInWord(digit) {
  const digits = ["zero", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine"];

  return digits[digit];
}

function get10To19(number) {
  const tenToNineteen = ["ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];

  return tenToNineteen[number % 10];
}

function tensValueInWord(tensValue) {
  const tens = ["twenty", "thirty", "forty", "fifty", "sixty",
    "seventy", "eighty", "ninety"
  ];

  return tens[tensValue - 2];
}

function toString(number) {
  return number + "";
}

function reverse(array) {
  const reversedArray = [];

  for (const element of array) {
    reversedArray.unshift(element);
  }

  return reversedArray;
}

function isNumberInRange(number, min, max) {
  return min <= number && number < max;
}

function twoDigitNumber(number) {
  if (isNumberInRange(number, 10, 20)) {
    return [get10To19(number)];
  }

  const onesDigit = number % 10;
  const tensDigit = Math.floor(number / 10);
  const numberInWords = [];

  if (onesDigit !== 0) {
    numberInWords.unshift(getDigitInWord(onesDigit));
  }

  if (tensDigit !== 0) {
    numberInWords.unshift(tensValueInWord(tensDigit));
  }

  return numberInWords;
}

function threeDigitNumber(number) {
  const numberInWords = twoDigitNumber(number % 100);
  const hundredsDigit = Math.floor(number / 100);

  if (hundredsDigit !== 0) {
    numberInWords.unshift("hundred");
    numberInWords.unshift(getDigitInWord(hundredsDigit));
  }

  return numberInWords;
}

function toNumber(stringNumber) {
  return stringNumber.trim() !== "" ? +stringNumber : NaN;
}

function numLength(number) {
  return toString(number).length;
}

function getPlaceValueName(placeValue) {
  if (placeValue < 1000) {
    return "";
  }

  const placeValues = ["thousand", "million", "billion"];
  const index = Math.floor(numLength(placeValue) / 3) - 1;

  return placeValues[index];
}

function encloseWith(str, char) {
  return char + str + char;
}

function addPlaceValue(numberString, placeValue) {
  return encloseWith(getPlaceValueName(placeValue), " ") + numberString;
}

function convertNumberToWords(digits) {
  let numberString = "";
  let placeValue = 1;

  for (const number of digits) {
    const numberInWords = threeDigitNumber(number);

    if (numberInWords.length !== 0) {
      numberString = addPlaceValue(numberString, placeValue);
    }

    numberString = numberInWords.join(" ") + numberString;
    placeValue = placeValue * 1000;
  }

  return numberString.trim();
}

function splitNumberIntoArray(number, noOfDigits) {
  if (noOfDigits < 1) {
    return [];
  }

  const numArray = [];
  const divisor = 10 ** noOfDigits;
  let remainingNumber = number;

  while (remainingNumber > 0) {
    const lastThreeDigits = remainingNumber % divisor;
    numArray.unshift(lastThreeDigits);
    remainingNumber = Math.floor(remainingNumber / divisor);
  }

  return numArray;
}

function reverseArray(array) {
  const reversedArray = [];

  for (const element of array) {
    reversedArray.unshift(element);
  }

  return reversedArray;
}

function getNumberInWords(number) {
  const groupedDigits = splitNumberIntoArray(number, 3);
  const reversedDigits = reverseArray(groupedDigits);

  return convertNumberToWords(reversedDigits);
}

function numberToWords(number) {
  if (number === 0) {
    return getDigitInWord(number);
  }

  return getNumberInWords(number);
}

// ----------------------Testing fragment------------------------------

function makeMessage(number, expected, actual) {
  const contextSegment = "numberToWords of '" + number + "'";
  const expectedSegment = " should be '" + expected + "'";
  const actualSegment = " and is '" + actual + "'";

  return contextSegment + expectedSegment + actualSegment;
}

function getMark(isPassed) {
  return isPassed ? "✅" : "❌";
}

function isTestPassed(actual, expected) {
  // if (isNaN(actual) && isNaN(expected)) {
  //   return true;
  // }

  return actual === expected;
}

function testNumberToWords(number, expected) {
  const actual = numberToWords(number);
  let message = getMark(isTestPassed(actual, expected));
  message += makeMessage(number, expected, actual);

  console.log(message);
}

function testCasesForDigits() {
  console.log("----------- 0 To 9 -------------")
  testNumberToWords(0, "zero");
  testNumberToWords(1, "one");
  testNumberToWords(2, "two");
  testNumberToWords(3, "three");
  testNumberToWords(4, "four");
  testNumberToWords(5, "five");
  testNumberToWords(6, "six");
  testNumberToWords(7, "seven");
  testNumberToWords(8, "eight");
  testNumberToWords(9, "nine");
}

function testCasesFor10To19() {
  console.log("----------- 10 To 19 -------------")
  testNumberToWords(10, "ten");
  testNumberToWords(11, "eleven");
  testNumberToWords(12, "twelve");
  testNumberToWords(13, "thirteen");
  testNumberToWords(14, "fourteen");
  testNumberToWords(15, "fifteen");
  testNumberToWords(16, "sixteen");
  testNumberToWords(17, "seventeen");
  testNumberToWords(18, "eighteen");
  testNumberToWords(19, "nineteen");
}

function testCasesFor20To99() {
  console.log("---------- 20 To 99 ----------");

  console.log("     ---- All Tens ------");
  testNumberToWords(20, "twenty");
  testNumberToWords(30, "thirty");
  testNumberToWords(40, "forty");
  testNumberToWords(50, "fifty");
  testNumberToWords(60, "sixty");
  testNumberToWords(70, "seventy");
  testNumberToWords(80, "eighty");
  testNumberToWords(90, "ninety");

  console.log("     ----- Tens with digits -------");
  testNumberToWords(21, "twenty one");
  testNumberToWords(22, "twenty two");
  testNumberToWords(23, "twenty three");
  testNumberToWords(24, "twenty four");
  testNumberToWords(25, "twenty five");
  testNumberToWords(26, "twenty six");
  testNumberToWords(27, "twenty seven");
  testNumberToWords(28, "twenty eight");
  testNumberToWords(29, "twenty nine");

  console.log("     ------ Ninetees -----");
  testNumberToWords(91, "ninety one");
  testNumberToWords(92, "ninety two");
  testNumberToWords(93, "ninety three");
  testNumberToWords(94, "ninety four");
  testNumberToWords(95, "ninety five");
  testNumberToWords(96, "ninety six");
  testNumberToWords(97, "ninety seven");
  testNumberToWords(98, "ninety eight");
  testNumberToWords(99, "ninety nine");
}

function testCasesForHundreds() {
  console.log("---------- Hundreds -------");
  testNumberToWords(100, "one hundred");
  testNumberToWords(200, "two hundred");
  testNumberToWords(300, "three hundred");
  testNumberToWords(900, "nine hundred");

  testNumberToWords(101, "one hundred one");
  testNumberToWords(111, "one hundred eleven");
  testNumberToWords(112, "one hundred twelve");
  testNumberToWords(130, "one hundred thirty");
  testNumberToWords(131, "one hundred thirty one");
  testNumberToWords(999, "nine hundred ninety nine");
}

function testCasesForThousands() {
  console.log("-------- Thousands ------");
  testNumberToWords(1000, "one thousand");
  testNumberToWords(1001, "one thousand one");
  testNumberToWords(1011, "one thousand eleven");
  testNumberToWords(1030, "one thousand thirty");
  testNumberToWords(1033, "one thousand thirty three");
  testNumberToWords(1100, "one thousand one hundred");
  testNumberToWords(1100, "one thousand one hundred");
  testNumberToWords(1103, "one thousand one hundred three");
  testNumberToWords(1112, "one thousand one hundred twelve");
  testNumberToWords(1123, "one thousand one hundred twenty three");

  console.log("--------- 10 Thousands --------");
  testNumberToWords(10000, "ten thousand");
  testNumberToWords(20000, "twenty thousand");
  testNumberToWords(90000, "ninety thousand");

  console.log("--------- 100 Thousands --------");
  testNumberToWords(100000, "one hundred thousand");
  testNumberToWords(200000, "two hundred thousand");
  testNumberToWords(900000, "nine hundred thousand");
}

function testCasesForMillions() {
  console.log("-------- Millions --------");
  testNumberToWords(1000000, "one million");
  testNumberToWords(2000000, "two million");
  testNumberToWords(9000000, "nine million");

  console.log("-------- 10 Millions --------");
  testNumberToWords(10000000, "ten million");
  testNumberToWords(20000000, "twenty million");
  testNumberToWords(12000000, "twelve million");
  testNumberToWords(90000000, "ninety million");

  console.log("-------- 100 Millions --------");
  testNumberToWords(100000000, "one hundred million");
  testNumberToWords(200000000, "two hundred million");
  testNumberToWords(120000000, "one hundred twenty million");
  testNumberToWords(900000000, "nine hundred million");

  console.log("-------- Final Millions -------");
  testNumberToWords(999999999,
    "nine hundred ninety nine million nine hundred ninety nine thousand nine " +
    "hundred ninety nine");

}

function testCasesForBillions() {
  console.log("-------- Billions --------");
  testNumberToWords(1000000000, "one billion");
  testNumberToWords(2000000000, "two billion");
  testNumberToWords(9000000000, "nine billion");

  console.log("-------- 10 Billions --------");
  testNumberToWords(10000000000, "ten billion");
  testNumberToWords(20000000000, "twenty billion");
  testNumberToWords(12000000000, "twelve billion");
  testNumberToWords(90000000000, "ninety billion");

  console.log("-------- 100 Billions --------");
  testNumberToWords(100000000000, "one hundred billion");
  testNumberToWords(200000000000, "two hundred billion");
  testNumberToWords(120000000000, "one hundred twenty billion");
  testNumberToWords(900000000000, "nine hundred billion");

  console.log("-------- Final Billions ----------");
  testNumberToWords(999999999999,
    "nine hundred ninety nine billion nine hundred ninety nine million" +
    " nine hundred ninety nine thousand nine hundred ninety nine");
}

function testAll() {
  testCasesForDigits();
  testCasesFor10To19();
  testCasesFor20To99();
  testCasesForHundreds();
  testCasesForThousands();
  testCasesForMillions();
  testCasesForBillions();
}

testAll();
