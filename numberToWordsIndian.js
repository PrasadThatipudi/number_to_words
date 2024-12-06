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

function getPlaceValueName(placeValue) {
  if (placeValue < 1000) {
    return "";
  }

  const placeValues = ["thousand", "lakh", "crore"];
  const index = Math.floor(Math.log10(placeValue) - 3) / 2;

  return placeValues[index];
}

function encloseWith(str, char) {
  return char + str + char;
}

function addPlaceValue(numberString, placeValue) {
  return encloseWith(getPlaceValueName(placeValue), " ") + numberString;
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

function convertNumberToWords(digits) {
  let numberString = "";
  let placeValue = 10;

  for (const number of digits) {
    const numberInWords = threeDigitNumber(number);

    if (numberInWords.length !== 0) {
      numberString = addPlaceValue(numberString, placeValue);
    }

    numberString = numberInWords.join(" ") + numberString;
    placeValue = placeValue * 100;
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
  const lastThreeDigits = number % 1000;
  const groupedDigits = splitNumberIntoArray(Math.floor(number / 1000), 2);

  groupedDigits.push(lastThreeDigits);
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
  console.log("---------- Hundreds ---------");

  console.log("----------- Hundred Basic --------");
  testNumberToWords(100, "one hundred");
  testNumberToWords(200, "two hundred");
  testNumberToWords(300, "three hundred");
  testNumberToWords(400, "four hundred");
  testNumberToWords(500, "five hundred");
  testNumberToWords(600, "six hundred");
  testNumberToWords(700, "seven hundred");
  testNumberToWords(800, "eight hundred");
  testNumberToWords(900, "nine hundred");

  console.log("----------- Hundred - ones -------");
  testNumberToWords(101, "one hundred one");
  testNumberToWords(102, "one hundred two");
  testNumberToWords(103, "one hundred three");
  testNumberToWords(104, "one hundred four");
  testNumberToWords(105, "one hundred five");
  testNumberToWords(106, "one hundred six");
  testNumberToWords(107, "one hundred seven");
  testNumberToWords(108, "one hundred eight");
  testNumberToWords(109, "one hundred nine");

  console.log("------------ Hundred - tens --------");
  testNumberToWords(120, "one hundred twenty");
  testNumberToWords(130, "one hundred thirty");
  testNumberToWords(140, "one hundred forty");
  testNumberToWords(150, "one hundred fifty");
  testNumberToWords(160, "one hundred sixty");
  testNumberToWords(170, "one hundred seventy");
  testNumberToWords(180, "one hundred eighty");
  testNumberToWords(190, "one hundred ninety");

  console.log("------------ Hundred - Tens with digits --------")
  testNumberToWords(121, "one hundred twenty one");
  testNumberToWords(122, "one hundred twenty two");
  testNumberToWords(123, "one hundred twenty three");
  testNumberToWords(124, "one hundred twenty four");
  testNumberToWords(125, "one hundred twenty five");
  testNumberToWords(126, "one hundred twenty six");
  testNumberToWords(127, "one hundred twenty seven");
  testNumberToWords(128, "one hundred twenty eight");
  testNumberToWords(129, "one hundred twenty nine");
}

function testCasesForThousands() {
  console.log("-------- Thousands ------");

  console.log("----------- Thousands Basic -------");
  testNumberToWords(1000, "one thousand");
  testNumberToWords(2000, "two thousand");
  testNumberToWords(3000, "three thousand");
  testNumberToWords(4000, "four thousand");
  testNumberToWords(5000, "five thousand");
  testNumberToWords(6000, "six thousand");
  testNumberToWords(7000, "seven thousand");
  testNumberToWords(8000, "eight thousand");
  testNumberToWords(9000, "nine thousand");

  console.log("-----------Thousands - ones -------");
  testNumberToWords(1001, "one thousand one");
  testNumberToWords(1002, "one thousand two");
  testNumberToWords(1003, "one thousand three");
  testNumberToWords(1004, "one thousand four");
  testNumberToWords(1005, "one thousand five");
  testNumberToWords(1006, "one thousand six");
  testNumberToWords(1007, "one thousand seven");
  testNumberToWords(1008, "one thousand eight");
  testNumberToWords(1009, "one thousand nine");

  console.log("------------ Thousand - tens --------");
  testNumberToWords(1020, "one thousand twenty");
  testNumberToWords(1030, "one thousand thirty");
  testNumberToWords(1040, "one thousand forty");
  testNumberToWords(1050, "one thousand fifty");
  testNumberToWords(1060, "one thousand sixty");
  testNumberToWords(1070, "one thousand seventy");
  testNumberToWords(1080, "one thousand eighty");
  testNumberToWords(1090, "one thousand ninety");

  console.log("------------ Thousand - Tens with digits --------")
  testNumberToWords(1021, "one thousand twenty one");
  testNumberToWords(1022, "one thousand twenty two");
  testNumberToWords(1023, "one thousand twenty three");
  testNumberToWords(1024, "one thousand twenty four");
  testNumberToWords(1025, "one thousand twenty five");
  testNumberToWords(1026, "one thousand twenty six");
  testNumberToWords(1027, "one thousand twenty seven");
  testNumberToWords(1028, "one thousand twenty eight");
  testNumberToWords(1029, "one thousand twenty nine");

  console.log("------ Thousand - Hundred");
  testNumberToWords(1100, "one thousand one hundred");
  testNumberToWords(1200, "one thousand two hundred");
  testNumberToWords(1300, "one thousand three hundred");
  testNumberToWords(1400, "one thousand four hundred");
  testNumberToWords(1500, "one thousand five hundred");
  testNumberToWords(1600, "one thousand six hundred");
  testNumberToWords(1700, "one thousand seven hundred");
  testNumberToWords(1800, "one thousand eight hundred");
  testNumberToWords(1900, "one thousand nine hundred");

  console.log("--------- Ten Thousands -----------");
  testNumberToWords(10000, "ten thousand");
  testNumberToWords(20000, "twenty thousand");
  testNumberToWords(30000, "thirty thousand");
  testNumberToWords(40000, "forty thousand");
  testNumberToWords(50000, "fifty thousand");
  testNumberToWords(60000, "sixty thousand");
  testNumberToWords(70000, "seventy thousand");
  testNumberToWords(80000, "eighty thousand");
  testNumberToWords(90000, "ninety thousand");
}

function testCasesForLakhs() {
  console.log("----------- Lakh --------");

  console.log("----------- Lakh Basic --------");
  testNumberToWords(100000, "one lakh");
  testNumberToWords(200000, "two lakh");
  testNumberToWords(300000, "three lakh");
  testNumberToWords(400000, "four lakh");
  testNumberToWords(500000, "five lakh");
  testNumberToWords(600000, "six lakh");
  testNumberToWords(700000, "seven lakh");
  testNumberToWords(800000, "eight lakh");
  testNumberToWords(900000, "nine lakh");

  console.log("------------- Ten Lakhs -------");
  testNumberToWords(1000000, "ten lakh");
  testNumberToWords(2000000, "twenty lakh");
  testNumberToWords(3000000, "thirty lakh");
  testNumberToWords(4000000, "forty lakh");
  testNumberToWords(5000000, "fifty lakh");
  testNumberToWords(6000000, "sixty lakh");
  testNumberToWords(7000000, "seventy lakh");
  testNumberToWords(8000000, "eighty lakh");
  testNumberToWords(9000000, "ninety lakh");
}

function testCasesForCrores() {
  console.log("----------- Crores --------");

  console.log("----------- Crores Basic --------");
  testNumberToWords(10000000, "one crore");
  testNumberToWords(20000000, "two crore");
  testNumberToWords(30000000, "three crore");
  testNumberToWords(40000000, "four crore");
  testNumberToWords(50000000, "five crore");
  testNumberToWords(60000000, "six crore");
  testNumberToWords(70000000, "seven crore");
  testNumberToWords(80000000, "eight crore");
  testNumberToWords(90000000, "nine crore");

  console.log("------------- Ten Crores -------");
  testNumberToWords(100000000, "ten crore");
  testNumberToWords(200000000, "twenty crore");
  testNumberToWords(300000000, "thirty crore");
  testNumberToWords(400000000, "forty crore");
  testNumberToWords(500000000, "fifty crore");
  testNumberToWords(600000000, "sixty crore");
  testNumberToWords(700000000, "seventy crore");
  testNumberToWords(800000000, "eighty crore");
  testNumberToWords(900000000, "ninety crore");
}

function testAll() {
  testCasesForDigits();
  testCasesFor10To19();
  testCasesFor20To99();
  testCasesForHundreds();
  testCasesForThousands();
  testCasesForLakhs();
  testCasesForCrores();
}

testAll();
