export const exceptSymbols = ["e", "E", "+", "-", ".", ","];
export const numericPattern = /^[\-]?([1-9]\d*|0)(\.\d+)?$/;
const phoneNumberPattern = /^0\d{9,10}$/;
export const POST_CODE_REGEX =
  /^[\d０１２３４５６７８９]{3}[－-]?[\d０１２３４５６７８９]{4}$/;
const phoneNumberHyphenPattern =
  /^\d{2,3}-\d{4}-\d{4}$|^\d{3}-\d{4}-\d{4}$|^\d{3}-\d{3,4}-\d{4}$/;

const kanaPattern = /^([ァ-ン]|ー)+$/;
const monthPattern = /^1[0-2]$|^0[1-9]$/;
const yearPattern = /^[12][0-9]{3}$/;
const kanjiPattern = /^[一-龥]$/;
const fullWidthKanji = /^[一-龥Ａ-ｚ]+$/;

/** Check argument have symbols provided */
export const isIncludesSymbols = (key: string): boolean => {
  return exceptSymbols.includes(key);
};

/** Validate phone number/mobile number */
export function isJapanPhoneNumber(phoneNumber: string) {
  return phoneNumberPattern.test(phoneNumber);
}

/** Validate phone or mobile number have hyphen (-) between */
export function isJapanHyphenPhoneNumber(phoneNumber: string) {
  return phoneNumberHyphenPattern.test(phoneNumber);
}

export function isKanjiText(text: string) {
  return kanjiPattern.test(text);
}

export function isKanaText(text: string) {
  return kanaPattern.test(text);
}

/** Month will have format like 01 02 03 */
export function isMonth(text: string) {
  return monthPattern.test(text);
}

export function isYear(text: string) {
  return yearPattern.test(text);
}

export function isFullWidthKanji(text: string) {
  return fullWidthKanji.test(text);
}
