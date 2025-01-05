import { useEffect, useState } from 'react';

import {
  isFunc,
  isArr,
  isStr,
  hasLen,
  isObjEmpty,
  isObj,
  isNum,
  isObjHasProps,
  isBoolTruthy,
  isArrEmpty,
  isStrHasLen,
} from './cond';

export const toCamel = (str) => {
  if (!isStr(str)) return null;

  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

export const toLower = (str) => {
  if (!isStr(str)) return null;

  return str.toLowerCase();
};

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param {string} input - The string to capitalize.
 * @return {string} The capitalized string.
 */
export const toCapitaliseFirst = (input) => {
  if (!isStr(input)) {
    return null;
  }

  const firstLetter = input.substring(0, 1).toUpperCase();
  const restOfTheString = input.substring(1).toLowerCase();
  return firstLetter + restOfTheString;
};

/**
 * Returns a new string with the first letter of each word in the input string capitalized,
 * joined by a specified delimiter. If the input is not a string, returns null.
 *
 * @param {string} str - The input string to capitalize.
 * @param {string} [delimiter=' '] - The delimiter to use between words in the output string.
 * @param {string} [join=' '] - The delimiter to use to join the capitalized words.
 * @return {string|null} A new string with the first letter of each word in the input string capitalized,
 * joined by the specified delimiter, or null if the input is not a string.
 */
export const toCapitalise = (str, delimiter = ' ', join = ' ') => {
  if (!isStr(str)) return null;

  return str
    .split(delimiter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(join);
};

export const findObjInArr = (arr, key, val) => {
  if (!isArr(arr) || !isStr(key) || !isStr(val)) return null;

  return arr.filter((item) => item[key] === val)[0];
};

export const toHyphen = (str) => {
  if (!isStr(str)) return null;

  return str.replace(/\s+/g, '-');
};

export const setPageTitle = (args = []) => {
  let arr = !isArr(args) ? [] : args;

  return arr
    .filter((item) => isStr(item) && hasLen(item))
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' | ');
};

export const clsesOnElem = (elem, cls, prop = 'add') => {
  const domElem = document.querySelector(`${elem}`);

  if (!domElem && typeof domElem === 'undefined' && domElem === null)
    return null;

  if (prop === 'add') {
    return domElem.classList.add(cls);
  }

  return domElem.classList.remove(cls);
};

export const getService = async (
  service,
  params = {},
  method = 'get',
  locale = 'en',
  populate = '*'
) => {
  if (!isFunc(service)) return null;

  let res = {};

  const svc = new service(locale, populate);

  res = await svc.get({ ...params });

  let data = res;

  if (res?.data) {
    data = res.data;
  }

  if (method === 'list') {
    return data;
  }

  return isArr(data) ? data[0] : data;
};

export const isEven = (n) => {
  return n % 2 === 0;
};

export const setNum = (num) => {
  return isNum(num) ? num : null;
};

export const setStr = (str, fallback) => {
  return isStr(str) && hasLen(str) ? str : fallback || null;
};

export const setArr = (arr, fallback) => {
  return isArr(arr) && hasLen(arr) ? arr : fallback || [];
};

export const setObj = (obj, fallback) => {
  return isObjHasProps(obj) ? obj : fallback || {};
};

export const getDate = (
  str,
  opts = { day: '2-digit', month: '2-digit', year: '2-digit' }
) => {
  if (!isStr(str)) return null;

  const date = new Date(str);

  return date.toLocaleDateString('en-GB', {
    ...opts,
  });
};

export const getTime = (str) => {
  if (!isStr(str)) return null;

  const date = new Date(str);

  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getDates = (startDate, endDate) => {
  if (!isStr(startDate) || !isStr(endDate)) return null;

  let start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  while (start <= end) {
    dates.push(start);
    start = addDays.call(start, 1);
  }

  return dates;
};

export const linkObj = (obj) => {
  if (!isObj(obj) || (isObj(obj) && isObjEmpty(obj))) return null;

  return {
    href: isStr(obj.linkUrl) ? obj.linkUrl : '',
    label: isStr(obj.linkLabel) ? obj.linkLabel : 'More info',
    target: isStr(obj.linkBehaviour) ? obj.linkBehaviour : '_blank',
    rel:
      isStr(obj.linkBehaviour) && obj.linkBehaviour === '_blank'
        ? 'nofollow noreferrer'
        : '',
  };
};

export const setThemeOpts = (obj, arr, val = '') => {
  if (!isObj(obj) || !isArr(arr) || !isStr(val)) return null;

  let theme = {
    ...obj,
  };

  arr.forEach((item) => {
    if (Object.keys(item)[0] === val) {
      theme = {
        ...theme,
        ...Object.values(item)[0],
      };
    }
  });

  return theme;
};

export const setData = (res, isLoading, method = 'get') => {
  if (method === 'get') {
    if (!isBoolTruthy(isLoading) && isObjHasProps(res)) {
      return isArr(res.data) ? res.data : [];
    }
    return [];
  }

  if (!isBoolTruthy(isLoading) && isObjHasProps(res)) {
    return isObj(res.data) ? res.data : {};
  }

  return {};
};

export const sanitizeArr = (arr, key = null, val = null) => {
  if (!isArr(arr) || isArrEmpty(arr)) return [];

  if (isStrHasLen(key)) {
    return arr.filter((item) => {
      const prop = item[key];

      if (isArrEmpty(prop) || !prop) {
        return false;
      }

      if (isStrHasLen(val)) {
        return toLower(prop) === toLower(val);
      }

      return prop;
    });
  }

  // Remove null/empty results
  return arr.filter((item) => item);
};

export const getArrItem = (arr, index = 0, fallback = []) => {
  if (!isArr(arr) || isArrEmpty(arr)) return fallback;

  return arr[index];
};

export const getSliceArr = (arr, start = 0, end = -1) => {
  if (!isArr(arr) || isArrEmpty(arr)) return [];

  return arr.slice(start, end);
};

export const imageUri = (src, fallback = '/images/social.jpg') => {
  if (!isStr(src)) {
    return fallback;
  }

  return src;
};

export const imageAlt = ({ alt, fallback = '' }) => {
  if (!isStr(alt)) {
    return fallback;
  }

  return alt;
};

export const setClassNames = (arr = []) => {
  if (!isArr(arr) || isArrEmpty(arr)) return null;

  return arr.filter((item) => isStrHasLen(item)).join(' ');
};

export const objProp = (obj, index = 0) => {
  if (isObjEmpty(obj)) return '';

  return Object.getOwnPropertyNames(obj)[index];
};

/**
 * Returns the value of the object at the specified index. If the object is empty, returns null.
 *
 * @param {Object} obj - the object to retrieve the value from
 * @param {number} [index=0] - the index of the value to retrieve (optional, defaults to 0)
 * @return {*} the value of the object at the specified index or null if the object is empty
 */
export const objVal = (obj, index = 0) => {
  if (isObjEmpty(obj)) return null;

  return obj[Object.keys(obj)[index]];
};

/**
 * Sorts an array of objects by a specified property.
 *
 * @param {Array} arr - The array to sort.
 * @param {string} [prop='name'] - The property to sort by. Defaults to 'name'.
 * @return {Array|null} - The sorted array, or null if invalid input.
 */
export const sortArrByProp = (arr, prop = 'name') => {
  if (!isArr(arr) || isArrEmpty(arr) || !isStrHasLen(prop)) return null;

  return arr.sort((a, b) =>
    a[prop].toLowerCase().localeCompare(b[prop].toLowerCase())
  );
};

/**
 * Creates a function that returns the result of passing its input through a
 * pipeline of functions. The functions are composed left to right, where the
 * output of each function is passed as the input to the next. If the array of
 * functions is empty, `null` is returned.
 *
 * @param {...Function} fns - The functions to compose.
 * @param {*} input - The input to the first function in the pipeline.
 * @return {*} The output of the final function in the pipeline.
 */
export const pipe = (...fns) => {
  if (isArrEmpty(fns)) return null;

  return function (input) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, input);
  };
};

/**
 * Returns an updated array of objects with a new 'url' property added to each object. The value of 'url'
 * is a string that concatenates the 'brand' parameter, '/activities/', and the 'slug' property of each object
 * in the input 'arr' if 'slug' is a non-empty string. If 'slug' is an empty string, 'url' is null.
 *
 * @param {Array} arr - The input array of activity objects.
 * @param {string} brand - The brand string to be concatenated with activity slug strings.
 * @return {Array} - A new array of activity objects with 'url' properties.
 */
export const activitiesUrls = (arr, brand) => {
  if (!isArr(arr) || isArrEmpty(arr) || !isStr(brand)) return [];

  return arr.map((item) => {
    return {
      ...item,
      url: isStrHasLen(item.slug) ? `${brand}/activities/${item.slug}` : null,
    };
  });
};

/**
 * Returns the number of truthy values in the input array.
 *
 * @param {Array} arr - The input array to count truthy values from.
 * @return {number} The number of truthy values in the input array.
 */
export const countArr = (arr) => {
  if (!isArr(arr) || isArrEmpty(arr)) return 0;

  return arr.filter((item) => item).length;
};

/**
 * Returns a url for an image of the specified size from the given object.
 * @param {object} obj
 * @param {string} fallback
 * @param {string} size
 * @returns
 */
export const getImgSize = (obj, fallback = '', size = 'thumbnail') => {
  if (!isObj(obj) || isObjEmpty(obj)) return null;

  return obj?.[size]?.url || fallback;
};

/**
 * Removes any keys with null values from the given object.
 *
 * @param {object} obj - The object to remove null keys from.
 * @return {object} - The object with null keys removed.
 */
export const removeNullKeys = (obj) => {
  if (isObj(obj)) {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null) {
        delete obj[key];
      }
    });
  }

  return obj;
};

/**
 * Remove duplicates from an array of objects based on a specific key.
 *
 * @param {Array} arr - The array to deduplicate.
 * @param {string} [key='slug'] - The key to use for comparison.
 * @return {Array} - A new array with no duplicate objects.
 */
export const dedupArrByKey = (arr = [], key = 'slug') => {
  const uniqueArray = [];
  const slugTracker = {};

  for (const obj of arr) {
    const value = obj[key];

    if (!slugTracker[value]) {
      slugTracker[value] = true;
      uniqueArray.push(obj);
    }
  }

  return uniqueArray;
};

export const setCurr = (str) => {
  if (!isStr(str)) return '';

  if (str === 'Euro -  €') {
    return '€';
  }
  return '£';
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return windowSize;
};

export const randomLottie = () => {
  const lottieArray = [
    '/json/octagon.json',
    '/json/triangles.json',
    '/json/rotating-lines.json',
    '/json/rotating-lines-around-circle.json',
    '/json/square-spiral.json',
    '/json/ovals.json',
  ];
  const randomLottieVal = Math.floor(Math.random() * lottieArray.length);

  return lottieArray[randomLottieVal];
};
