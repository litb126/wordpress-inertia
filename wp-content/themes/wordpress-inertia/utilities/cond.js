export const isArr = (arr) => {
  return Array.isArray(arr) || false;
};

export const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]' || false;
};

export const isStr = (str) => {
  return typeof str === 'string' || false;
};

export const isFunc = (func) => {
  return func instanceof Function || false;
};

export const hasLen = (arg) => {
  if (!arg) return false;
  return arg.length > 0 || false;
};

export const isBool = (bool) => {
  return typeof bool === 'boolean' || false;
};

export const isDate = (date) => {
  return (date instanceof Date && !isNaN(date)) || false;
};

export const isNum = (num) => {
  return typeof num === 'number' || false;
};

export const isEmail = (str) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return regexExp.test(str);
};

export const isPhone = (str) => {
  const regexExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
  return regexExp.test(str);
};

/**
 * Checks if a given string is a valid URL or relative URL.
 *
 * @param {string} str - The string to be checked.
 * @return {boolean} true if the string is a valid URL, false otherwise.
 */
export const isUrl = (str) => {
  const protocolPattern = /^(http|https|ftp|file):\/\//;
  const relativePattern = /^\//;

  return protocolPattern.test(str) || relativePattern.test(str);
};

export const isObjEmpty = (obj) => {
  if (!isObj(obj)) {
    return false;
  }
  return Object.keys(obj).length === 0;
};

export const isStrHasLen = (str) => {
  return (isStr(str) && hasLen(str)) || false;
};

export const isStrEmpty = (str) => {
  return (isStr(str) && !hasLen(str)) || false;
};

export const isArrHasLen = (arr) => {
  return (isArr(arr) && hasLen(arr)) || false;
};

export const isArrEmpty = (arr) => {
  return (isArr(arr) && !hasLen(arr)) || false;
};

export const isObjHasProps = (obj) => {
  return (isObj(obj) && !isObjEmpty(obj)) || false;
};

export const isBoolTruthy = (bool) => {
  return isBool(bool) && bool;
};

export const isBoolFalsey = (bool) => {
  return isBool(bool) && !bool;
};
