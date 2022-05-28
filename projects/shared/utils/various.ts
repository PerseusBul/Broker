export const phoneRegex = /^\+?[\d]{8,18}$/;
export const bulMobPhoneRegex = /^\s*(?:(?:(?:00|\+)\s*3\s*5\s*9)|(?:0))\s*([1-9]\s*(?:\d\s*){8})\s*$/;

export const isValidBulMobPhone = (phone: string) => {
  return bulMobPhoneRegex.test(phone);
};

export const canonicalizePhone = (phone: string) => {
  const match = phoneRegex.exec(phone);

  if (!match) {
    // do nothing on non-phone strings
    return phone;
  }

  // take only the significant part of the phone number and remove any whitespace
  return match[1].replace(/\s/g, '');
};

export const formatCanonicalPhone = (canonicalPhone: string) =>
  canonicalPhone && canonicalPhone.length ? `0${canonicalPhone}` : '';

export const emailRegex = /^[a-zа-я0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zа-я0-9-]+(\.[a-z0-9-]+)$/i;

const allowedSpecCharsForNames = [
  '\u002D', // - : HYPHEN-MINUS {hyphen or minus sign}
  '\u2010', // ‐ : HYPHEN
  '\u2011', // ‑ : NON-BREAKING HYPHEN
  '\u2012', // ‒ : FIGURE DASH
  '\u2013', // – : EN DASH
  '\u2014', // — : EM DASH
  '\u2015', // ― : HORIZONTAL BAR {quotation dash}
  '\u005F', // _ : LOW LINE
  '\u0027', // ' : APOSTROPHE {APL quote}
  '\u0022', // " : QUOTATION MARK
  '\u2019', // ’ : RIGHT SINGLE QUOTATION MARK {single comma quotation mark}
  '\u201E', // „ : DOUBLE LOW-9 QUOTATION MARK {low double comma quotation mark}
  '\u201C' // “ : LEFT DOUBLE QUOTATION MARK {double turned comma quotation mark}
];

export const nameRegex = new RegExp('^[a-zа-я0-9\\s' + allowedSpecCharsForNames.join('') + ']{1,30}$', 'i');

export const fullNameRegex = new RegExp('^[a-zа-я0-9\\s' + allowedSpecCharsForNames.join('') + ']{1,100}$', 'i');

export const passwordRegex =
  "^(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[\\'<>{};:.,~!@#$%^&()\\+=\\-_])(?=\\S+$).{8,128}$";

export const passwordLengthInRange = /^.{8,128}$/;

export const existingPasswordRegex = new RegExp(
  `^[${allowedSpecCharsForNames.join('')}<>{};*:.,~!@#$%^&()=№€§\\+\\[\\]\\?\\|\\/0-9a-zа-я]{8,128}$`,
  'i'
);

export const insuranceCardRegex = new RegExp(
  `^[${allowedSpecCharsForNames.join('')}<>{};*:.,~!@#$%^&()=№€§\\+\\[\\]\\?\\|\\/0-9a-zа-я]{1,20}$`,
  'i'
);

export const symbolRegex = new RegExp(
  `[${allowedSpecCharsForNames.join('')}<>{};*:.,~!@#$%^&()=№€§\\+\\[\\]\\?\\|\\/]+`
);

export const isValidEGN = (egn: any) => {
  if (!/^\d{10}$/.test(egn)) {
    return false;
  }

  var checkDigit =
    (egn[0] * 2 +
      egn[1] * 4 +
      egn[2] * 8 +
      egn[3] * 5 +
      egn[4] * 10 +
      egn[5] * 9 +
      egn[6] * 7 +
      egn[7] * 3 +
      egn[8] * 6) %
    11;

  checkDigit = checkDigit === 10 ? 0 : checkDigit;

  return checkDigit === parseInt(egn[9], 10);
};

export const isValidLNC = (lnc: any) => {
  if (!/^\d{10}$/.test(lnc)) {
    return false;
  }

  var checkDigit =
    (lnc[0] * 21 +
      lnc[1] * 19 +
      lnc[2] * 17 +
      lnc[3] * 13 +
      lnc[4] * 11 +
      lnc[5] * 9 +
      lnc[6] * 7 +
      lnc[7] * 3 +
      lnc[8] * 1) %
    10;

  return checkDigit === parseInt(lnc[9], 10);
};

export const ibanRegex = /^BG\d{2}\s*[A-Z]{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{2}$/;

export const invoiceNumberRegex = /^\d{10}$/;

export const zipCodeRegex = /^\d{4}$/;

export function throwError(errorMessage?: string): never {
  throw new Error(errorMessage ?? 'Unknown error');
}

export function throwParamError(param: string): never {
  throw new Error(`missing or incorrect route parameter '${param}'`);
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function tryParseInt(str: string | null | undefined): number | null {
  if (str == null) {
    return null;
  }

  const res = parseInt(str);

  if (isNaN(res)) {
    return null;
  }

  return res;
}

export function deepEqual(obj1: any, obj2: any) {
  // `typeof null` is still "object" in JS, a major "gotcha" to watch out for.
  function isObject(obj: any) {
    return typeof obj === 'object' && obj != null;
  }

  if (obj1 === obj2) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const obj1keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1keys.length !== obj2keys.length) {
    return false;
  }

  for (let k of obj1keys) {
    if (!deepEqual(obj1[k], obj2[k])) {
      return false;
    }
  }

  return true;
}

export function disableOptimizations(obj: any) {
  return Math.pow(-1, 2) > 0 ? obj : null;
}

export const superdocLink: string = 'https://superdoc.bg/lekari?sort=&insurance_id=14';

export const tooltipDefaultCSS = 'bg-white text-black text-sm sm:text-base border-gray-200 border-solid border-2 p-2';

export const infoIconDefaultClass = 'text-axiom -mr-2';
export const infoIconValidFieldClass = 'text-success -mr-2';
